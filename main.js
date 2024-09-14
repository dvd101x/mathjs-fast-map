import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import {
    create,
    all
} from "https://cdn.jsdelivr.net/npm/mathjs@latest/+esm"

// switch to false before uplading?
const fast = false

const N = fast ? 100 : 500
const trials = fast ? 20 : 50
const warmups = fast ? 5 : 10

const math = create(all);
const A = math.random([N, N], -1, 1)


const cb1 = Math.abs
const cb1t = math.abs
const cb1t1 = math.typed({ 'number': Math.abs })

const tests1 = [
    { name: '0 abs', run: () => math.abs(A) },
    { name: '1a map', run: () => math.map(A, cb1) },
    { name: '1b new map', run: () => newMap(A, cb1) },
    { name: '2a map typed simple', run: () => math.map(A, cb1t1) },
    { name: '2b new map typed simple', run: () => newMap(A, cb1t1) },
    { name: '3a map typed', run: () => math.map(A, cb1t) },
    { name: '3b new map typed', run: () => newMap(A, cb1t) },
]

const messages1 = `<li>map == newMap for function: ${math.deepEqual(
    math.map(A, cb1),
    newMap(A, cb1)
)}</li>
    <li>map == new Map for typed: ${math.deepEqual(
    math.map(A, cb1t),
    newMap(A, cb1t)
)}</li>
    <li>map == map typed: ${math.deepEqual(
    math.map(A, cb1), math.map(A, cb1t)
)}</li>`

document.querySelector("#messages1").innerHTML = messages1


const results1 = benchmark(tests1)

const plot1 = Plot.plot({
    x: {
        label: 'time [ms] →',
        grid: true,
        //domain: [0, 10]
    },
    y: {
        label: null
    },
    title: "map callback(value)",
    marginLeft: 120,
    marks: [
        Plot.ruleX([0]),
        Plot.boxX(results1, {
            y: "name",
            x: "time"
        }),
    ]
})
const div1 = document.querySelector("#plot1");
div1.append(plot1);


const cb2 = (v, i) => v + i[0] - i[1] / 13
const cb2t = math.typed({ 'number, Array': cb2, 'number, Matrix': cb2 })
const cb2t1 = math.typed({ 'number, Array': cb2 })

const tests2 = [
    { name: '1a map', run: () => math.map(A, cb2) },
    { name: '1b new map', run: () => newMap(A, cb2) },
    { name: '2a map typed simple', run: () => math.map(A, cb2t1) },
    { name: '2b new map typed simple', run: () => newMap(A, cb2t1) },
    { name: '3a map typed', run: () => math.map(A, cb2t) },
    { name: '3b new map typed', run: () => newMap(A, cb2t) },
]

const messages2 = `<li>map == newMap for function: ${math.deepEqual(
    math.map(A, cb2),
    newMap(A, cb2)
)}</li>
    <li>map == new Map for typed: ${math.deepEqual(
    math.map(A, cb2t),
    newMap(A, cb2t)
)}</li>
    <li>map == map typed: ${math.deepEqual(
    math.map(A, cb2), math.map(A, cb2t)
)}</li>`

document.querySelector("#messages2").innerHTML = messages2

const results2 = benchmark(tests2)

const plot2 = Plot.plot({
    x: {
        label: 'time [ms] →',
        grid: true,
        //domain: [0, 10]
    },
    y: {
        label: null
    },
    title: "map callback(value, index)",
    marginLeft: 120,
    marks: [
        Plot.ruleX([0]),
        Plot.boxX(results2, {
            y: "name",
            x: "time"
        }),
    ]
})
const div = document.querySelector("#plot2");
div.append(plot2);

const tests3 = [
    { name: '0 abs', run: () => math.abs(A) },
    { name: '1a map', run: () => math.forEach(A, cb1) },
    { name: '1b new map', run: () => newForEach(A, cb1) },
    { name: '2a map typed simple', run: () => math.forEach(A, cb1t1) },
    { name: '2b new map typed simple', run: () => newForEach(A, cb1t1) },
    { name: '3a map typed', run: () => math.forEach(A, cb1t) },
    { name: '3b new map typed', run: () => newForEach(A, cb1t) }
]

const t3_1a = []
math.forEach(A, (v) => t3_1a.push(cb1(v)))

const t3_1b = []
newForEach(A, (v) => t3_1b.push(cb1(v)))

const t3_2a = []
math.forEach(A, math.typed({ 'number': (v) => t3_2a.push(cb1(v)) }))

const t3_2b = []
newForEach(A, math.typed({ 'number': (v) => t3_2b.push(cb1(v)) }))

const messages3 = `<li>forEach == newForEach for function: ${math.deepEqual(
    t3_1a,
    t3_1b
)}</li>
    <li>forEach == newforEach for typed: ${math.deepEqual(
    t3_2a,
    t3_2b
)}</li>
    <li>forEach == forEach typed: ${math.deepEqual(
    t3_1a, t3_2a
)}</li>`

document.querySelector("#messages3").innerHTML = messages3

const results3 = benchmark(tests3)

const plot3 = Plot.plot({
    x: {
        label: 'time [ms] →',
        grid: true,
        //domain: [0, 10]
    },
    y: {
        label: null
    },
    title: "forEach callback(value)",
    marginLeft: 120,
    marks: [
        Plot.ruleX([0]),
        Plot.boxX(results3, {
            y: "name",
            x: "time"
        }),
    ]
})
const div3 = document.querySelector("#plot3");
div3.append(plot3);



const tests4 = [
    { name: '1a map', run: () => math.forEach(A, cb2) },
    { name: '1b new map', run: () => newForEach(A, cb2) },
    { name: '2a map typed simple', run: () => math.forEach(A, cb2t1) },
    { name: '2b new map typed simple', run: () => newForEach(A, cb2t1) },
    { name: '3a map typed', run: () => math.forEach(A, cb2t) },
    { name: '3b new map typed', run: () => newForEach(A, cb2t) },
]

const t4_1a = []
math.forEach(A, (v, i) => t4_1a.push(cb2(v, i)))

const t4_1b = []
newForEach(A, (v, i) => t4_1b.push(cb2(v, i)))

const t4_2a = []
math.forEach(A, math.typed({ 'number, Array': (v, i) => t4_2a.push(cb2(v, i)) }))

const t4_2b = []
newForEach(A, math.typed({ 'number, Array': (v, i) => t4_2b.push(cb2(v, i)) }))

let messages4 = ""

messages4 += `<li>forEach == newForEach for function: ${math.deepEqual(
    t4_1a,
    t4_1b
)}</li>`

messages4 += `<li>forEach == newForEach for typed: ${math.deepEqual(
    t4_2a,
    t4_2b
)}</li>`

messages4 += `<li>forEach == forEach typed: ${math.deepEqual(
    t4_1a, t4_2a,
)}</li>`

document.querySelector("#messages4").innerHTML = messages4

const results4 = benchmark(tests4)

const plot4 = Plot.plot({
    x: {
        label: 'time [ms] →',
        grid: true,
        //domain: [0, 10]
    },
    y: {
        label: null
    },
    title: "forEach callback(value, index)",
    marginLeft: 120,
    marks: [
        Plot.ruleX([0]),
        Plot.boxX(results4, {
            y: "name",
            x: "time"
        }),
    ]
})
const div4 = document.querySelector("#plot4");
div4.append(plot4);



function getMaxArguments(typedCallback, args) {
    for (let i = 1; i <= args.length; i++) {
        if (math.typed.resolve(typedCallback, args.slice(0, i)) !== null) {
            return i
        }
    }
    return null
}

function _deepMap(A, cb, N) {
    switch (N) {
        case 1: return recurse1(A)
        case 2: return recurse2(A, [])
        case 3: return recurse3(A, [])
    }

    function recurse1(X) {
        if (Array.isArray(X)) {
            return X.map((x, i) => recurse1(x))
        } else {
            return cb(X)
        }
    }

    function recurse2(X, index) {
        if (Array.isArray(X)) {
            const dim = index.push(null) - 1
            const results = X.map((x, i) => {
                index[dim] = i
                return recurse2(x, index)
            })
            index.pop()
            return results
        } else {
            return cb(X, index)
        }
    }

    function recurse3(X, index) {
        if (Array.isArray(X)) {
            const dim = index.push(null) - 1
            const results = X.map((x, i) => {
                index[dim] = i
                return recurse3(x, index)
            })
            index.pop()
            return results
        } else {
            return cb(X, index, A)
        }
    }
}

function _deepForEach(A, cb, N) {
    switch (N) {
        case 1:
            recurse1(A)
            break
        case 2:
            recurse2(A, [])
            break
        case 3:
            recurse3(A, [])
            break
    }

    function recurse1(X) {
        if (Array.isArray(X)) {
            X.forEach((x, i) => recurse1(x))
        } else {
            cb(X)
        }
    }

    function recurse2(X, index) {
        if (Array.isArray(X)) {
            const dim = index.push(null) - 1
            X.forEach((x, i) => {
                index[dim] = i
                recurse2(x, index)
            })
            index.pop()
        } else {
            cb(X, index)
        }
    }

    function recurse3(X, index) {
        if (Array.isArray(X)) {
            const dim = index.push(null) - 1
            X.forEach((x, i) => {
                index[dim] = i
                recurse3(x, index)
            })
        } else {
            cb(X, index, A)
        }
    }
}

function getFirstValueAndIndex(A) {
    let firstValue
    const firstIndex = []
    recurse(A)
    return [firstValue, firstIndex]

    function recurse(A) {
        if (Array.isArray(A)) {
            firstIndex.push(0)
            recurse(A[0])
        } else {
            firstValue = A
        }
    }
}

function newMap(A, cb) {
    if (math.typed.isTypedFunction(cb)) {
        const [firstValue, firstIndex] = getFirstValueAndIndex(A)
        const argsLength = getMaxArguments(cb, [firstValue, firstIndex, A])
        const numberOfPossibleSignatures = Object.values(cb.signatures)
            .map(x => x.length)   // get the number of arguments of each function
            .filter(x => x === argsLength) // filter only the ones that matches in length with the args to try
            .length // check the length of the array
        if (numberOfPossibleSignatures <= 1) {
            const implementation = math.typed.resolve(cb, [firstValue, firstIndex, A].slice(0, argsLength)).implementation
            return _deepMap(A, implementation, argsLength)
        } else {
            return _deepMap(A, cb, argsLength)
        }
    } else {
        return _deepMap(A, cb, cb.length)
    }
}

function newForEach(A, cb) {
    if (math.typed.isTypedFunction(cb)) {
        const [firstValue, firstIndex] = getFirstValueAndIndex(A)
        const argsLength = getMaxArguments(cb, [firstValue, firstIndex, A])
        const numberOfPossibleSignatures = Object.values(cb.signatures)
            .map(x => x.length)   // get the number of arguments of each function
            .filter(x => x === argsLength) // filter only the ones that matches in length with the args to try
            .length // check the length of the array
        if (numberOfPossibleSignatures <= 1) {
            const implementation = math.typed.resolve(cb, [firstValue, firstIndex, A].slice(0, argsLength)).implementation
            return _deepForEach(A, implementation, argsLength)
        } else {
            return _deepForEach(A, cb, argsLength)
        }
    } else {
        return _deepForEach(A, cb, cb.length)
    }
}

function benchmark(tests) {
    const benchResults = [];
    for (let i = 0; i < trials + warmups; i++) {
        tests.forEach(test => {
            const start = performance.now();
            test.run();
            const end = performance.now();
            benchResults.push({ name: test.name, time: end - start });
        })
    }
    return benchResults.slice(warmups);
}