export function benchmark(tests, trials = 10, warmups = 2) {
    const benchResults = [];
    for (let i = 0; i < trials + warmups; i++) {
        tests.forEach(test => {
            const start = performance.now();
            test.run();
            const end = performance.now();
            benchResults.push({ name: test.name, time: end - start });
        })
    }
    return benchResults.slice(warmups*tests.length);
}