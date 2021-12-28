function Node(letter, freq, used, father, code) {
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.father = father;
    this.code = code;
}

let fs = require("fs");
let arg = process.argv;
let alph = new Array();
let inputData = fs.readFileSync(arg[2]);
inputData = inputData.toString();
for (let i = 0; i < inputData.length; i++) {
    alph[inputData.charAt(i)] = 0;
}
for (let i = 0; i < inputData.length; i++) {
    alph[inputData.charAt(i)] += 1;
}
let tree = new Array();
for (q in alph) {
    let n = new Node(q, alph[q], false, null, '');
    tree.push(n);
}
long = tree.length;
for (let i = 0; i < long - 1; i++) {
    let mininal = inputData.length;
    let first;
    let second;
    for (let k = 0; k < tree.length; k++) {
        if (mininal > tree[k].freq && !tree[k].used) {
            mininal = tree[k].freq;
            first = k;
        }
    }
    tree[first].used = true;
    tree[first].father = tree.length;
    tree[first].code = '0';
    let minS = inputData.length;
    for (let i = 0; i < tree.length; i++) {
        if (minS > tree[i].freq && !tree[i].used) {
            minS = tree[i].freq;
            second = i;
        }
    }

    tree[second].used = true;
    tree[second].father = tree.length;
    tree[second].code = '1';
    let n = new Node(tree[first].letter + tree[second].letter, tree[first].freq + tree[second].freq, false, null, '')
    tree.push(n);
}
let codes = [];
for (let i = 0; i < long; i++) {
    let g = i;
    codes[tree[g].letter] = '';
    while (tree[g].father != null) {
        codes[tree[i].letter] = tree[g].code + codes[tree[i].letter];
        g = tree[g].father;

    }
}
let str = '';
for (let i = 0; i < long; i++) {
    let j = inputData[i];
    str += codes[j];
}
fs.writeFileSync(arg[3],str);