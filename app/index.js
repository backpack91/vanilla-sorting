// Load application styles
import 'styles/index.less';

// ================================
// START YOUR APP HERE
// ================================

var numberCollector = [];
var chosenBefore = [];

function inputNumBarMaker(numbersToMakeBars) {
  var sortOptions = document.querySelector('#sortChooser');
  var biggestOne = numbersToMakeBars.reduce(function(acc, ele) {
    return ele > acc ? ele : acc;
  }, numbersToMakeBars[0]);
  for( var i = 0; i < numbersToMakeBars.length; i++ ) {
    var barInChart = document.createElement('div');
    var numBox = document.createElement('div');
    var chart = document.querySelector('.chart');
    var heightRateOfBar = ( numbersToMakeBars[i] / biggestOne * 100 ) - 10;

    numBox.classList.add('numBox');
    numBox.innerText = numbersToMakeBars[i] + '';
    barInChart.classList.add('barsInChart');
    barInChart.style.height = `${heightRateOfBar}%`;
    barInChart.appendChild(numBox);
    chart.appendChild(barInChart);
  }
}

(function numberPutter () {
  var inputButton = document.querySelector('.inputButton');
  var numberInput = document.querySelector('.numberInput');

  inputButton.addEventListener('click', function() {
    if( numberCollector.length < 10 ) {
      numberCollector.push(Number(numberInput.value));
      numberInput.value = '';
      numberInput.focus();
    }
  });
})();

(function startButtSetter() {
  var startButt = document.querySelector('#startButt');
  var options = document.querySelector('#sortChooser');

  startButt.addEventListener('click', function() {
    inputNumBarMaker(numberCollector);
    chooseSort();
  });
})();

function chooseSort() {
  var options = document.querySelector('#sortChooser');

  if( options.value === 'bubble') {
    bubbleSort(numberCollector);
  } else if( options.value === 'insertion' ) {
    insertionSort(numberCollector);
  } else if( options.value === 'merge' ) {
    mergeSort.sort(numberCollector);
    mergeSort.timingSetter();
  } else if( options.value === 'selection' ) {
    selectionSort(numberCollector);
  }
}

function bubbleSort(arrToSort) {
  var count = 1000;

  for( var j = arrToSort.length; j >= 2; j-- ) {
    for( var i = 0; i < j-1; i++ ) {
      if( i !== j-1 && arrToSort[i] > arrToSort[i+1] ) {
        var valueStorage = arrToSort[i];
        arrToSort[i] = arrToSort[i+1];
        arrToSort[i+1] = valueStorage;
        setTimeout(barExchanger.bind(null, i), count);
        count += 1000;
      } else {
        setTimeout(showCurrentbar.bind(null, i), count);
        count += 1000;
      }
    }
  }
  setTimeout(unchooseBar.bind(null, i-1), count);
}

function showCurrentbar(i) {
  var chart = document.querySelector('.chart');
  var firstBar = chart.children[i];
  var secondBar = chart.children[i+1];
  var thirdBar = chart.children[i+2];

  if( chosenBefore.length ){
    chosenBefore[0].classList.remove('chosenBar');
    chosenBefore[1].classList.remove('chosenBar');
    chosenBefore[0].classList.add('barsInChart');
    chosenBefore[1].classList.add('barsInChart');
    chosenBefore.length = 0;
  }
  chosenBefore.push(firstBar);
  chosenBefore.push(secondBar);
  firstBar.classList.remove('barsInChart');
  secondBar.classList.remove('barsInChart');
  firstBar.classList.add('chosenBar');
  secondBar.classList.add('chosenBar');
}

function barExchanger(i) {
  if( chosenBefore.length ){
    chosenBefore[0].classList.remove('chosenBar');
    chosenBefore[1].classList.remove('chosenBar');
    chosenBefore[0].classList.add('barsInChart');
    chosenBefore[1].classList.add('barsInChart');
    chosenBefore.length = 0;
  }
  var chart = document.querySelector('.chart');
  var firstBar = chart.children[i];
  var secondBar = chart.children[i+1];
  var thirdBar = chart.children[i+2];

  chosenBefore.push(firstBar);
  chosenBefore.push(secondBar);
  firstBar.classList.remove('barsInChart');
  secondBar.classList.remove('barsInChart');
  firstBar.classList.add('chosenBar');
  secondBar.classList.add('chosenBar');
  if( chart.children[i+2] ) {
    chart.insertBefore(firstBar, thirdBar);
    chart.insertBefore(secondBar, firstBar);
  } else {
    chart.appendChild(secondBar);
    chart.appendChild(firstBar);
  }
}

function unchooseBar(i) {
  var chart = document.querySelector('.chart');
  var firstBar = chart.children[i];
  var secondBar = chart.children[i+1];

  firstBar.classList.remove('chosenBar');
  secondBar.classList.remove('chosenBar');
  firstBar.classList.add('barsInChart');
  secondBar.classList.add('barsInChart');
}

function selectionSort(arrToSort, beginIndex, count) {
  if( beginIndex === undefined ) {
    beginIndex = 0;
    count = 1000;
  }
  var min = arrToSort[beginIndex];
  var eleToExchange = arrToSort[beginIndex];
  var minIndex = beginIndex;
  count += 1000;

  for( var i = beginIndex; i < arrToSort.length; i++ ) {
    if( min > arrToSort[i] ) {
      min = arrToSort[i];
      minIndex = i;
    }
  }
  setTimeout(showCurrentbarSelection.bind(null, beginIndex, minIndex), count);
  count += 1000;
  setTimeout(selectedBarExchanger.bind(null, beginIndex, minIndex),count);
  arrToSort[beginIndex] = min;
  arrToSort[minIndex] = eleToExchange;
  if( beginIndex+1 !== arrToSort.length ) {
    return selectionSort(arrToSort, beginIndex+1, count);
  } else {

    return arrToSort;
  }
}

function showCurrentbarSelection(beginIndex, minIndex) {
  if( chosenBefore.length ){
    chosenBefore[0].classList.remove('chosenBar');
    chosenBefore[1].classList.remove('chosenBar');
    chosenBefore[0].classList.add('barsInChart');
    chosenBefore[1].classList.add('barsInChart');
    chosenBefore.length = 0;
  }
  var chart = document.querySelector('.chart');
  var toBeChanged = chart.children[beginIndex];
  var nextOfMinNumBar = chart.children[minIndex];
  var minNumBar = chart.children[minIndex];

  chosenBefore.push(toBeChanged);
  chosenBefore.push(minNumBar);
  toBeChanged.classList.remove('barsInChart');
  minNumBar.classList.remove('barsInChart');
  toBeChanged.classList.add('chosenBar');
  minNumBar.classList.add('chosenBar');
}

function selectedBarExchanger(beginIndex, minIndex) {
  var chart = document.querySelector('.chart');
  var toBeChanged = chart.children[beginIndex];
  var nextOfMinNumBar = chart.children[minIndex+1];
  var minNumBar = chart.children[minIndex];

  if( chart.children[beginIndex+1] ) {
    chart.insertBefore(minNumBar, toBeChanged);
    chart.insertBefore(toBeChanged, nextOfMinNumBar);
  } else {
    chosenBefore[0].classList.remove('chosenBar');
    chosenBefore[1].classList.remove('chosenBar');
    chosenBefore[0].classList.add('barsInChart');
    chosenBefore[1].classList.add('barsInChart');
  }
}

function insertionSort(arrToSort) {
  var chartWrapper = document.querySelector('.chartWrapper');
  var extraChart = document.createElement('div');
  var chart = document.querySelector('.chart');
  extraChart.classList.add('extraChart');
  chartWrapper.appendChild(extraChart);
  chart.classList.add('chartForInsertion');
  var count = 1000;

  for ( var i = 1; i < arrToSort.length; i++ ) {
    var standardNum = arrToSort[i];
    setTimeout(showCurrentbarInsertion.bind(null,i), count);
    count += 500;
    setTimeout(flyMaker.bind(null,i), count);
    count += 500;
    for ( var j = i-1; j >= 0; j-- ) {
      setTimeout(showCurrentbarInsertion.bind(null,j), count);
      count += 500;
      if ( arrToSort[j] >=  standardNum ) {
        arrToSort[j+1] = arrToSort[j];
        setTimeout(barMover.bind(null,i,j), count);
        count += 500;
        if( j === 0 ) {
          arrToSort[j] = standardNum;
          setTimeout(barLander.bind(null,j), count);
          count += 500;
        }
      } else if ( arrToSort[j] < standardNum ) {
        arrToSort[j+1] = standardNum;
        setTimeout(barLander.bind(null,j+1), count);
        count += 500;
        break;
      }
    }
  }
  setTimeout(function(){
    document.querySelector('.extraChart').remove();
    chosenBefore[0].classList.remove('chosenBar');
    chosenBefore[0].classList.add('barsInChart');}, count);

  return arrToSort;
}

function showCurrentbarInsertion(standardIndex) {
  var chart = document.querySelector('.chart');
  var standardBar = chart.children[standardIndex];

  if( chosenBefore.length ){
    chosenBefore[0].classList.remove('chosenBar');
    chosenBefore[0].classList.add('barsInChart');
    chosenBefore.length = 0;
  }
  chosenBefore.push(standardBar);
  standardBar.classList.remove('barsInChart');
  standardBar.classList.add('chosenBar');
}

function barMover(standardIndex, comparingIndex) {
  var chart = document.querySelector('.chart');
  var standardBar = chart.children[standardIndex];
  var nextOfStandard = chart.children[comparingIndex+2];
  var comparingBar = chart.children[comparingIndex];

  chart.insertBefore(comparingBar, nextOfStandard);
}

function flyMaker(flyingBarIndex) {
  var chart = document.querySelector('.chart');
  var flyingBar = chart.children[flyingBarIndex];
  var nextOfFlyingBar = chart.children[flyingBarIndex+1];
  var spaceContainer = document.createElement('div');
  var extraChart = document.querySelector('.extraChart');

  spaceContainer.classList.add('spaceContainer');
  chart.insertBefore(spaceContainer, nextOfFlyingBar);
  chosenBefore.push(flyingBar);
  extraChart.appendChild(flyingBar);
}

function barLander(landingIndex) {
  var chart = document.querySelector('.chart');
  var extraChart = document.querySelector('.extraChart');
  var flyingBar = extraChart.children[0];
  var nextOfLandingPoint = chart.children[landingIndex+1];

  chart.children[landingIndex].remove();
  chart.insertBefore(flyingBar, nextOfLandingPoint);
}

var mergeSort = {
  chart: document.querySelector('.chart'),
  arrToSort: null,
  queue: [],
  count: 1000,
  tempIndex: null
};



mergeSort.sort = function(arrToSort, range) {
  if( range === undefined ) {
    range = [0,arrToSort.length-1];
  }
  var mid = Math.floor(range[0]+(range[1]-range[0])/2);
  var left = [range[0], mid];
  var right = [mid+1, range[1]];
  if( range[1] - range[0] === 0 ) {
    return range;
  } else {
    this.queue.push({
      type: 'DIVIDE',
      mid: left[1]
    });
    return this.merger(this.sort(arrToSort, left), this.sort(arrToSort, right), arrToSort);
  }
};

mergeSort.merger = function(left, right, arrToSort) {
  var leftArrCopy = arrToSort.slice(left[0], left[1]+1);
  var rightArrCopy = arrToSort.slice(right[0], right[1]+1);
  var originLeftLength = leftArrCopy.length;
  var originRightLength = rightArrCopy.length;
  var temp = [];
  var tempIndex = [];
  var tmpIndexCount = 0;

  while ( leftArrCopy.length !== 0 || rightArrCopy.length !== 0 ) {
    if( rightArrCopy.length === 0 && leftArrCopy.length > 0 ) {
      temp.push(leftArrCopy.splice(0,1)[0]);
      var countOfPush = originLeftLength-leftArrCopy.length;
      tempIndex.push(left[0]+countOfPush-1);
    } else if( leftArrCopy.length === 0 && rightArrCopy.length > 0 ) {
      temp.push(rightArrCopy.splice(0,1)[0]);
      var countOfPush = originRightLength-rightArrCopy.length;
      tempIndex.push(right[0]+countOfPush-1);
    } else if( leftArrCopy[0] >= rightArrCopy[0] ) {
      temp.push(rightArrCopy.splice(0, 1)[0]);
      var countOfPush = originRightLength-rightArrCopy.length;
      tempIndex.push(right[0]+countOfPush-1);
    } else if( leftArrCopy[0] < rightArrCopy[0] ) {
      temp.push(leftArrCopy.splice(0, 1)[0]);
      var countOfPush = originLeftLength-leftArrCopy.length;
      tempIndex.push(left[0]+countOfPush-1);
    }
  }
  for( var i = left[0]; i < right[1]+1; i++ ) {
    if( arrToSort[i] !== temp[tmpIndexCount] ){
      if ( i === left[0] ) {
        this.queue.push({
          type: 'COMPARE',
          indexRange: [left[0], right[1]]
        });
        this.queue.push({
          type: 'SWAP',
          indexPair: [i, tempIndex[tmpIndexCount]],
          range: [left[0], right[1]],
          temp: tempIndex
        });
      }
      arrToSort[i] = temp[tmpIndexCount];
      tmpIndexCount++;
    }
  }
  if( arrToSort.length === right[1]-left[0]+1 ) {
    this.queue.push({
      type: 'COMBINE',
      indexRange: [left[0], right[1]]
    })
    this.queue.push({
      type: 'INPLACE',
      indexRange: [left[0], right[1]]
    });
    return arrToSort;
  } else {
    this.queue.push({
      type: 'COMBINE',
      indexRange: [left[0], right[1]]
    });
    this.queue.push({
      type: 'NONCOMPARE',
      indexRange: [left[0], right[1]]
    });
    return [left[0], right[1]];
  }
};

mergeSort.timingSetter = function() {
  for( var i = 0; i < this.queue.length; i++ ) {
    setTimeout(this.visualizer.bind(this, this.queue[i]), this.count);
    this.count += 500;
  }
};

mergeSort.visualizer = function(data) {
  switch (data.type) {
    case 'COMPARE':
      this.compare(data);
      break;
    case 'SWAP' :
      this.swap(data);
      break;
    case 'DIVIDE' :
      this.divide(data);
      break;
    case 'INPLACE' :
      this.inplace(data);
      break;
    case 'COMBINE' :
      this.combine(data);
      break;
    case 'NONCOMPARE' :
      this.nonCompare(data);
      break;
  }
};

mergeSort.compare = function(data) {
  for ( var i = data.indexRange[0]; i < data.indexRange[1]+1; i++ ) {
    this.chart.children[i].style.background = 'yellowgreen';
  }
};

mergeSort.swap = function(data) {
  var bar = this.chart.children[data.indexPair[0]];
  var barToSwap = this.chart.children[data.indexPair[1]];
  var sortedDivSaver = [];
  if ( this.tempIndex !== data.temp ) {
    for( var i = 0; i < data.temp.length; i++ ) {
      var nthBar = this.chart.children[data.temp[i]].cloneNode(true);
      sortedDivSaver.push(nthBar);
    }
    for(var i = data.range[0]; i < data.range[1]+1; i++) {
      var barToBeReplaced = this.chart.children[i];
      this.chart.replaceChild(sortedDivSaver[0], barToBeReplaced);
      sortedDivSaver.shift();
    }
  }
  setTimeout(function(){
    bar.style.background = 'yellow';
    barToSwap.style.background = 'yellow';
  }, this.count);
  this.count += 500;
  this.tempIndex = data.temp;
};

mergeSort.divide = function(data) {
  var midBar = this.chart.children[data.mid];
  midBar.style.margin = '10px 40px 10px 10px';
};

mergeSort.combine = function(data) {
  for( var i = data.indexRange[0]; i < data.indexRange[1]; i++ ) {
    var midBar = this.chart.children[i];
    midBar.style.margin = '10px';
  }
};

mergeSort.inplace = function(data) {
  for ( var i = data.indexRange[0]; i < data.indexRange[1]+1; i++ ){
    var barsInplace = this.chart.children[i];
    barsInplace.style.background = 'purple';
  }
};

mergeSort.nonCompare = function(data) {
  for( var i = data.indexRange[0]; i < data.indexRange[1]+1; i++ ) {
    var midBar = this.chart.children[i];
    midBar.style.background = 'yellow';
  }
};
