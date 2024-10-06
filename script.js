const techBox = document.getElementById("tech");
const respBox = document.getElementById("resp");
const noteBox = document.getElementById("notes");
const wcBox = document.getElementById("wordcount");
const ccBox = document.getElementById("charcount");
const warning = document.getElementById("code-warning");

let w = 11;
let c = 0;

if (document.location.hash.length > 1 || document.location.search.length > 1) {
    const sp = new URLSearchParams(document.location.hash.slice(1) || document.location.search);
    w = sp.get("w") || 11;
    c = sp.get("c") || 0;
    techBox.value = sp.get("t") || "";
    noteBox.value = sp.get("n") || "";

    warning.classList.toggle("hidden", !sp.get("t"));
}

function check() {
    var r = respBox.value;
    let valid = eval(techBox.value || "true");

    respBox.classList.toggle("invalid", !valid);

    wc();
    if (techBox.value || noteBox.value) {
        window.location.hash = (new URLSearchParams({w, c, t: techBox.value, n: noteBox.value})).toString();
    } else {
        window.location.hash = '';
    }

}

// ref: https://github.com/carykh/ewow_public_tools/blob/main/get_word_count.py
// ref: https://docs.python.org/3/library/stdtypes.html#str.isalnum
const isAlnumRe = /\p{Letter}|\p{Nd}|\p{Decimal_Number}|\p{Other_Number}|\p{Letter_Number}/u;

function wc() {
    let resp = respBox.value;
    let count = resp.split(" ").filter(word => isAlnumRe.test(word)).length;
    wcBox.innerText = `${count}${w == 0 ? '' : `/${w}`} word${count != 1 ? 's' : ''}`;
    wcBox.classList.toggle("invalid", w == 0 ? false : count > w);

    ccBox.innerText = `${resp.length}${c == 0 ? '' : `/${c}`} character${resp.length != 1 ? 's' : ''}`;
    ccBox.classList.toggle("invalid", c == 0 ? false : resp.length > c);
}

techBox.addEventListener("input", check);
respBox.addEventListener("input", check);
noteBox.addEventListener("input", check);
wc();