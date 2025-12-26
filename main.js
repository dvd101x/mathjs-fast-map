import {
    create,
    all
} from "mathjs"

import * as Plot from "plot";

import { benchmark } from "benchmark";

// switch to false before uplading
const fast = false

const N = fast ? 100 : 500
const trials = fast ? 20 : 100
const warmups = fast ? 5 : 20

const math = create(all);
const size = [N, N]
const A = math.random(size, -1, 1)
const Aflat = math.flatten(A)

const tests = [
    { name: '1. create', run: () => math.matrix(A) },
    { name: '2. clone', run: () => math.clone(A) },
    { name: '3. clone flat', run: () => A.slice() },
    { name: '4. create flat and reshape', run: () => math.matrix(Aflat).reshape(size)},
    { name: "5. create no val", run : () => matrix(A, size) },
    { name: "6. create no val skip clone", run : () => matrix(A, size, true) },
]

function matrix(data, size, skipClone = false) {
    const m = math.matrix([])
    m._data = skipClone ? data : math.clone(data)
    m._size = size.slice()
    m._datatype = undefined
    return m
}

const messages = `<li>create == create flat and reshape: ${math.deepEqual(
    math.matrix(A),
    math.matrix(A).reshape(size)
)}</li>
    <li>create == clone: ${math.deepEqual(math.matrix(A).valueOf(), math.clone(A))}</li>
    <li>create == clone flat: ${math.deepEqual(math.flatten(math.matrix(A)).valueOf(), Aflat)}</li>
    <li>create == create flat and reshape: ${math.deepEqual(
    math.matrix(A),
    math.matrix(Aflat).reshape(size)
)}</li>
    <li>create == create no val: ${math.deepEqual(
    math.matrix(A),
    matrix(A, size)
)}</li>
    <li>create == create no val skip clone: ${math.deepEqual(
    math.matrix(A),
    matrix(A, size, true)
)}</li>`

document.querySelector("#messages").innerHTML = messages

const results = benchmark(tests, trials, warmups)

const plot = Plot.plot({
    x: {
        label: 'time [ms] →',
        grid: true,
        //domain: [0, 10]
    },
    y: {
        label: null
    },
    title: "matrix creation",
    marginLeft: 150,
    marks: [
        Plot.ruleX([0]),
        Plot.boxX(results, {
            y: "name",
            x: "time"
        }),
    ]
})

const div = document.querySelector("#plot");
div.append(plot);

const AM = math.matrix(A)
const AMN = math.matrix(A, 'dense', 'number')
const sqrt = math.typed({'number': Math.sqrt})
const wraped = (x) => math.sqrt(x)

const tests2 = [
    { name: ' 1. map sqrt', run: () => math.map(AM, Math.sqrt) },
    { name: ' 2. map sqrt number', run: () => math.map(AMN, Math.sqrt) },
    { name: ' 3. map typed sqrt', run: () => math.map(AM, math.sqrt) },
    { name: ' 4. map typed sqrt number', run: () => math.map(AMN, math.sqrt) },
    { name: ' 5. map single typed sqrt', run: () => math.map(AM, sqrt) },
    { name: ' 6. map single typed sqrt number', run: () => math.map(AMN, sqrt) },
    { name: ' 7. map wraped typed sqrt', run: () => math.map(AM, wraped) },
    { name: ' 8. map wraped typed sqrt number', run: () => math.map(AMN, wraped) },
    { name: ' 9. map wraped sqrt', run: () => math.map(AM, x => math.sqrt(x)) },
    { name: '10. map wraped sqrt number', run: () => math.map(AMN, x => math.sqrt(x)) },
]

const results2 = benchmark(tests2, trials, warmups)

const div2 = document.querySelector("#plot2");
const plot2 = Plot.plot({
    x: {
        label: 'time [ms] →',
        grid: true,
        //domain: [0, 10]
    },
    y: {
        label: null
    },
    title: "matrix mapping",
    marginLeft: 150,
    marks: [
        Plot.ruleX([0]),
        Plot.boxX(results2, {
            y: "name",
            x: "time"
        }),
    ]
})

div2.append(plot2);
const messages2 = `<li>map sqrt == map sqrt number (Math.sqrt): ${math.deepEqual(
    math.map(AM, Math.sqrt),
    math.map(AMN, Math.sqrt)
)}</li>
    <li>map sqrt == map sqrt number (math.sqrt): ${math.deepEqual(
    math.map(AM, math.sqrt),
    math.map(AMN, math.sqrt)
)}</li>
    <li>map sqrt == map sqrt number (typed sqrt): ${math.deepEqual(
    math.map(AM, sqrt),
    math.map(AMN, sqrt)
)}</li>
    <li>map sqrt == map sqrt number (wrapped sqrt): ${math.deepEqual(
    math.map(AM, wraped),
    math.map(AMN, wraped)
)}</li>`

document.querySelector("#messages2").innerHTML = messages2