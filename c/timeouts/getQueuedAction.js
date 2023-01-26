export function getQueuedAction(action, time) {
    const queue = [];

    return () => {
        queue.push(true);

        setTimeout(() => {
            queue.pop();

            if (!queue.length) {
                action();
            }
        }, time);
    };
}
