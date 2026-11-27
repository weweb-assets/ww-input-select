import { computed } from 'vue';
import { areValuesEqual } from '../utils';

const repeatSnapshots = new WeakMap();
const changedReferences = new WeakMap();
const changedSlots = new WeakMap();

export function getRepeatSnapshot(items) {
    if (!items) return null;
    let snapshot = repeatSnapshots.get(items);
    if (!snapshot) {
        snapshot = computed(() => items.slice());
        repeatSnapshots.set(items, snapshot);
    }
    return snapshot.value;
}

function referenceMoved(item, from, to) {
    if (item === null || typeof item !== 'object') return false;
    let byDestination = changedReferences.get(from);
    if (!byDestination) {
        byDestination = new WeakMap();
        changedReferences.set(from, byDestination);
    }
    let references = byDestination.get(to);
    if (!references) {
        references = new Set();
        for (const [index, candidate] of from.entries()) {
            if (!Object.is(candidate, to[index])) references.add(candidate);
        }
        byDestination.set(to, references);
    }
    return references.has(item);
}

function sameRepeatData(first, second) {
    if (Object.is(first, second)) return true;
    if (globalThis._?.isEqual) return globalThis._.isEqual(first, second);
    try {
        return areValuesEqual(first, second);
    } catch {
        return false;
    }
}

// Index copied data independently of object field order. Equality is checked
// separately because JSON can map different JS values to the same string.
function repeatDataKey(data) {
    const sortedObjects = new WeakMap();
    try {
        return JSON.stringify(data, (_, value) => {
            if (!value || Object.getPrototypeOf(value) !== Object.prototype) return value;
            if (!sortedObjects.has(value)) {
                sortedObjects.set(
                    value,
                    Object.fromEntries(
                        Object.keys(value)
                            .sort()
                            .map(key => [key, value[key]])
                    )
                );
            }
            return sortedObjects.get(value);
        });
    } catch {
        // Cyclic and other non-serializable rows can still match by reference.
        return undefined;
    }
}

function getChangedSlots(from, to) {
    let byDestination = changedSlots.get(from);
    if (!byDestination) {
        byDestination = new WeakMap();
        changedSlots.set(from, byDestination);
        // A snapshot may still hold row objects whose contents change later.
        queueMicrotask(() => changedSlots.delete(from));
    }
    let byContent = byDestination.get(to);
    if (byContent) return byContent;

    byContent = new Map();
    for (const [index, item] of from.entries()) {
        if (index < to.length && sameRepeatData(item, to[index])) continue;
        const key = repeatDataKey(item);
        if (key === undefined) continue;
        const matches = byContent.get(key);
        if (matches) matches.push(item);
        else byContent.set(key, [item]);
    }
    byDestination.set(to, byContent);
    return byContent;
}

function matchesChangedSlot(item, from, to) {
    const key = repeatDataKey(item);
    if (key === undefined) return false;
    return (
        getChangedSlots(from, to)
            .get(key)
            ?.some(candidate => sameRepeatData(candidate, item)) ?? false
    );
}

export function repeatSlotChanged({ data, items, position }, previous) {
    if (Object.is(data, previous.data)) return false;
    if (!items || !previous.items) return !sameRepeatData(data, previous.data);

    // A page change reuses visible positions for different absolute positions.
    if (position !== previous.position) return true;

    // References can distinguish equal rows, but a shared reference left in
    // another slot does not mean the row moved there.
    if (referenceMoved(data, previous.items, items) || referenceMoved(previous.data, items, previous.items)) {
        return true;
    }
    if (sameRepeatData(data, previous.data)) return false;

    // A copied row must match a position that changed. Matching a row that
    // stayed in place could instead be a same-position edit or a duplicate.
    return matchesChangedSlot(data, previous.items, items) || matchesChangedSlot(previous.data, items, previous.items);
}
