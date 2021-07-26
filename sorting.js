function id(id) {
  return document.getElementById(id);
}

function rectangle(id, h, w, x) {
  return `<rect id='${id}' height='${h}' width='${w}' x='${x}' fill='darkred' />`;
}

function sleep(ms) {
  return new Promise(Rolve => setTimeout(Rolve, ms));
}

async function bubbleSort(A) {
  let B = [...A];
  for (let i = 0; i < B.length; i++) {
    for (let j = 1; j < B.length - i; j++) {
      if (B[j] < B[j - 1]) {
        B[j - 1] = [B[j], B[j] = B[j - 1]][0];
        id(`${j}`).setAttribute('height', B[j]);
        id(`${j - 1}`).setAttribute('height', B[j - 1]);
        await sleep(5);
      }
    }
  }
}

function merge(L, R) {
  let A = [];
  while (L.length && R.length) {
    A.push(L[0] < R[0] ? L.shift() : R.shift());
  }
  A.push(...(L.length ? L : R));
  return A;
}


async function mergeSort(A) {
  if (A.length > 1) {
    let R = A.map(x => [x]);
    while (R.length > 1) {
      let T = [];
      for (let i = 1; i < R.length; i += 2) {
        T.push(merge(R[i], R[i - 1]));
      }
      if (R.length % 2) {
        T.push(R.pop());
      }
      let j = 0;
      for (let row of T) {
        for (let col of row) {
          id(`${j++}`).setAttribute('height', col);
          await sleep(5);
        }
      }
      R = [...T];
    }
  }
}

function binarySearch(A, L, R, x) {
  while (L < R) {
    let M = Math.floor((L + R) / 2);
    if (x < A[M]) {
      R = M;
    } else if (x > A[M]) {
      L = M + 1;
    } else {
      return M;
    }
  }
  return L;
}

async function insertionSort(A) {
  let B = [...A];
  for (let i = 0; i < B.length - 1; i++) {
    if (B[i + 1] < B[i]) {
      let index = binarySearch(B, 0, i + 1, B[i + 1]);
      B.splice(index, 0, B.splice(i + 1, 1)[0]);
      for (let j = index; j <= i + 1; j++) {
        id(`${j}`).setAttribute('height', B[j]);
        await sleep(5);
      }
    }
  }
}

async function quickSort(A) {
  let B = [...A],
      q = [[0, B.length - 1]];
  while (q.length) {
    let [L, R] = q.shift();
    if (L < R) {
      let [left, right] = [[], []];
      for (let i = L; i < R; i++) {
        (B[i] < B[R] ? left : right).push(B[i]);
      }
      let result = [...left, B[R], ...right];
      for (let i = 0; i < result.length; i++) {
        B[L + i] = result[i];
        id(`${L + i}`).setAttribute('height', result[i]);
        await sleep(5);
      }
      let j = L + left.length;
      q.push([L, j - 1], [j + 1, R]);
    }
  }
}

let box = id('box'),
    field = id('field'),
    status = id('status'),
    itemsBox = id('items'),
    shuffle = id('shuffle'),
    reset = id('reset'),
    mergeSortButton = id('mergeSort'),
    bubbleSortButton = id('bubbleSort'),
    insertionSortButton = id('insertionSort'),
    quickSortButton = id('quickSort'),
    boxHeight,
    boxWidth,
    A;

let boxResizeObserver = new ResizeObserver(
  () => {
    boxWidth = window.getComputedStyle(box).width;
    box.style.height = boxWidth;
    boxWidth = parseInt(boxWidth, 10);
    boxHeight = boxWidth;
  }
)

boxResizeObserver.observe(box);

shuffle.onclick = () => {
  A = [];
  field.innerHTML = '';
  status.style.visibility = 'hidden';
  let items = parseInt(itemsBox.value, 10),
      dW = items ? boxWidth / items : undefined,
      fieldInnerHTML = '';
  for (let i = 0; i < items; i++) {
    A.push(Math.random() * boxHeight);
    fieldInnerHTML += rectangle(i, A[i], dW, i * dW);
  }
  field.innerHTML = fieldInnerHTML;
}

reset.onclick = () => {
  status.style.visibility = 'hidden';
  A.forEach(
    (x, i) => id(`${i}`).setAttribute('height', x)
  );
}

mergeSortButton.onclick = () => {
  status.style.visibility = 'hidden';
  mergeSort(A).then(
    () => { status.style.visibility = 'visible'; }
  );
}

bubbleSortButton.onclick = () => {
  status.style.visibility = 'hidden';
  bubbleSort(A).then(
    () => { status.style.visibility = 'visible'; }
  );
}

insertionSortButton.onclick = () => {
  status.style.visibility = 'hidden';
  insertionSort(A).then(
    () => { status.style.visibility = 'visible'; }
  );
}

quickSortButton.onclick = () => {
  status.style.visibility = 'hidden';
  quickSort(A).then(
    () => { status.style.visibility = 'visible'; }
  );
}
