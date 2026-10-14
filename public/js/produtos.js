const minRange = document.getElementById('minRange');
const maxRange = document.getElementById('maxRange');
const minInput = document.getElementById('minInput');
const maxInput = document.getElementById('maxInput');
const clearBtn = document.getElementById('clearBtn');

function updateMin() {
  if (parseInt(minRange.value) > parseInt(maxRange.value)) {
    minRange.value = maxRange.value;
  }
  minInput.value = minRange.value;
}

function updateMax() {
  if (parseInt(maxRange.value) < parseInt(minRange.value)) {
    maxRange.value = minRange.value;
  }
  maxInput.value = maxRange.value;
}

minRange.addEventListener('input', updateMin);
maxRange.addEventListener('input', updateMax);

minInput.addEventListener('change', () => {
  minRange.value = minInput.value;
  updateMin();
});

maxInput.addEventListener('change', () => {
  maxRange.value = maxInput.value;
  updateMax();
});

clearBtn.addEventListener('click', () => {
  minRange.value = 0;
  maxRange.value = 2400;
  updateMin();
  updateMax();
});