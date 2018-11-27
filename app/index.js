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
    if( ele > acc ) {

      return ele;
    } else {

      return acc;
    }
  }, numbersToMakeBars[0]);
  for( var i = 0; i < numbersToMakeBars.length; i++ ) {
    var barInChart = document.createElement('div');
    var numBox = document.createElement('div');
    var chart = document.querySelector('.chart');
    var heightRateOfBar = (numbersToMakeBars[i]/biggestOne*100)-10;

    numBox.setAttribute('class', 'numBox');
    numBox.innerText = numbersToMakeBars[i] + '';
    barInChart.setAttribute('class', 'barsInChart');
    barInChart.setAttribute('style', `height: ${heightRateOfBar}%;`);
    barInChart.appendChild(numBox);
    chart.appendChild(barInChart);
  }
};

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
  } else if( options.value === 'insurtion' ) {
    insurtionSort(numberCollector);
  } else if( options.value === 'merge' ) {
    mergeSort.sort(numberCollector);
    mergeSort.timingSetter();
  } else if( options.value === 'selection' ) {
    selectionSort(numberCollector);
  }
};

function bubbleSort(arrToSort) {
  var count = 1000;

  for( var j = arrToSort.length; j >= 0; j-- ) {
    for( var i = 0; i < j-1; i++ ) {
      if( i !== j-1 && arrToSort[i] > arrToSort[i+1] ) {
        var valueStorage = arrToSort[i];
        arrToSort[i] = arrToSort[i+1];
        arrToSort[i+1] = valueStorage;
        setTimeout(bubbleSortAnimator.bind(null, i+1), count);
        count += 1000;
      } else {
        setTimeout(showCurrentbar.bind(null, i+1), count);
        count += 1000;
      }
    }
  }
};

function showCurrentbar(i) {
  var chart = document.querySelector('.chart');
  var firstBar = chart.childNodes[i];
  var secondBar = chart.childNodes[i+1];
  var thirdBar = chart.childNodes[i+2];

  if( chosenBefore.length ){
    chosenBefore[0].setAttribute('class', 'barsInChart');
    chosenBefore[1].setAttribute('class', 'barsInChart');
    chosenBefore.length = 0;
  }
  chosenBefore.push(firstBar);
  chosenBefore.push(secondBar);
  firstBar.setAttribute('class', 'chosenBar');
  secondBar.setAttribute('class', 'chosenBar');
};

function bubbleSortAnimator(i) {
  if( chosenBefore.length ){
    chosenBefore[0].setAttribute('class', 'barsInChart');
    chosenBefore[1].setAttribute('class', 'barsInChart');
    chosenBefore.length = 0;
  };
  var chart = document.querySelector('.chart');
  var firstBar = chart.childNodes[i];
  var secondBar = chart.childNodes[i+1];
  var thirdBar = chart.childNodes[i+2];

  chosenBefore.push(firstBar);
  chosenBefore.push(secondBar);
  firstBar.setAttribute('class', 'chosenBar');
  secondBar.setAttribute('class', 'chosenBar');
  if( chart.childNodes[i+2] ) {
    chart.insertBefore(firstBar, thirdBar);
    chart.insertBefore(secondBar, firstBar);
  } else {
    chart.appendChild(secondBar);
    chart.appendChild(firstBar);
  }
};

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
  setTimeout(showCurrentbarselection.bind(null, beginIndex, minIndex), count);
  count += 1000;
  setTimeout(selectionAnimator.bind(null, beginIndex, minIndex),count);
  arrToSort[beginIndex] = min;
  arrToSort[minIndex] = eleToExchange;
  if( beginIndex+1 !== arrToSort.length ) {
    return selectionSort(arrToSort, beginIndex+1, count);
  } else {

    return arrToSort;
  }
};

function showCurrentbarselection(beginIndex, minIndex) {
  if( chosenBefore.length ){
    chosenBefore[0].setAttribute('class', 'barsInChart');
    chosenBefore[1].setAttribute('class', 'barsInChart');
    chosenBefore.length = 0;
  };
  var chart = document.querySelector('.chart');
  var toBeChanged = chart.childNodes[beginIndex+1];
  var nextOfMinNumBar = chart.childNodes[minIndex+2];
  var minNumBar = chart.childNodes[minIndex+1];

  chosenBefore.push(toBeChanged);
  chosenBefore.push(minNumBar);
  toBeChanged.setAttribute('class', 'chosenBar');
  minNumBar.setAttribute('class', 'chosenBar');
};

function selectionAnimator(beginIndex, minIndex) {
  var chart = document.querySelector('.chart');
  var toBeChanged = chart.childNodes[beginIndex+1];
  var nextOfMinNumBar = chart.childNodes[minIndex+2];
  var minNumBar = chart.childNodes[minIndex+1];

  if( chart.childNodes[beginIndex+2] ) {
    chart.insertBefore(minNumBar, toBeChanged);
    chart.insertBefore(toBeChanged, nextOfMinNumBar);
  } else {
    chosenBefore[0].setAttribute('class', 'barsInChart');
    chosenBefore[1].setAttribute('class', 'barsInChart');
  }
};

function insurtionSort(arrToSort) {
  var chartWrapper = document.querySelector('.chartWrapper');
  var extraChart = document.createElement('div');
  var chart = document.querySelector('.chart');
  extraChart.setAttribute('class', 'extraChart');
  chartWrapper.appendChild(extraChart);
  chart.setAttribute('style', 'border-radius: 5px 5px 0 0 ;');
  var count = 1000;

  for ( var i = 1; i < arrToSort.length; i++ ) {
    var standardNum = arrToSort[i];
    setTimeout(showCurrentbarInsurtion.bind(null,i), count);
    count += 500;
    setTimeout(flyMaker_insurtion.bind(null,i), count);
    count += 500;
    for ( var j = i-1; j >= 0; j-- ) {
      setTimeout(showCurrentbarInsurtion.bind(null,j), count);
      count += 500;
      if ( arrToSort[j] >=  standardNum ) {
        arrToSort[j+1] = arrToSort[j];
        setTimeout(barMover_insurtion.bind(null,i,j), count);
        count += 500;
        if( j === 0 ) {
          arrToSort[j] = standardNum;
          setTimeout(barLander_insurtion.bind(null,j), count);
          count += 500;
        }
      } else if ( arrToSort[j] < standardNum ) {
        arrToSort[j+1] = standardNum;
        setTimeout(barLander_insurtion.bind(null,j+1), count);
        count += 500;
        break;
      }
    }
  }
  setTimeout(function(){chosenBefore[0].setAttribute('class', 'barsInChart')}, count);
  setTimeout(function(){document.querySelector('.extraChart').remove()}, count);

  return arrToSort;
};

function showCurrentbarInsurtion(standardIndex) {
  var chart = document.querySelector('.chart');
  var standardBar = chart.childNodes[standardIndex+1];

  if( chosenBefore.length ){
    chosenBefore[0].setAttribute('class', 'barsInChart');
    chosenBefore.length = 0;
  }
  chosenBefore.push(standardBar);
  standardBar.setAttribute('class', 'chosenBar');
};

function barMover_insurtion(standardIndex, comparingIndex) {
  var chart = document.querySelector('.chart');
  var standardBar = chart.childNodes[standardIndex+1];
  var nextOfStandard = chart.childNodes[comparingIndex+3];
  var comparingBar = chart.childNodes[comparingIndex+1];

  chart.insertBefore(comparingBar, nextOfStandard);
};

function flyMaker_insurtion(flyingBarIndex) {
  var chart = document.querySelector('.chart');
  var flyingBar = chart.childNodes[flyingBarIndex+1];
  var nextOfFlyingBar = chart.childNodes[flyingBarIndex+2];
  var spaceContainer = document.createElement('div');
  var extraChart = document.querySelector('.extraChart');

  spaceContainer.setAttribute('class', 'spaceContainer');
  chart.insertBefore(spaceContainer, nextOfFlyingBar);
  chosenBefore.push(flyingBar);
  extraChart.appendChild(flyingBar);
};

function barLander_insurtion(landingIndex) {
  var chart = document.querySelector('.chart');
  var extraChart = document.querySelector('.extraChart');
  var flyingBar = extraChart.childNodes[0];
  var nextOfLandingPoint = chart.childNodes[landingIndex+2];

  chart.childNodes[landingIndex+1].remove();
  chart.insertBefore(flyingBar, nextOfLandingPoint);
};

var mergeSort = {
  chart: document.querySelector('.chart'),
  animationList: [],
  arrToSort: null
};

mergeSort.sort = function(arrToSort, range) {
  if( typeof range === 'undefined' ) {
    range = [0,arrToSort.length-1];
  }
  var mid = Math.floor(range[0]+(range[1]-range[0])/2);
  var left = [range[0], mid];
  var right = [mid+1, range[1]];
  if( range[1] - range[0] === 0 ) {
    return range;
  } else {
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
  var count = 0;

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
    console.log('before: ',i, arrToSort[i],'after: ',tempIndex[count], temp[count]);
    arrToSort[i] = temp[count];
    count++;
  }
  if( arrToSort.length === right[1]-left[0]+1 ) {
    return arrToSort;
  } else {
    return [left[0], right[1]];
  }
};

mergeSort.timingSetter = function() {
  var count = 1000;

  for( var i = 0; i < this.animationList.length; i++ ) {
    setTimeout(this.animationList[i], count);
    count += 1000;
  }
};

mergeSort.highLighter = function() {
  this.chart.childNodes;
};

mergeSort.divideAnimator = function(arrToSort, currentArr, indexToDivide) {
  var basicHeight = 30;
  var basicWidth = 15;
  var indexStart = arrToSort.indexOf(currentArr[0]);

  this.chart.childNodes[indexStart+indexToDivide+1].setAttribute('style', 'margin:0 0 0 30px;');
  this.lengthCounter += 1;
};

mergeSort.mergeAnimator = function(arrToSort, currentArr, indexToDivide) {
};
