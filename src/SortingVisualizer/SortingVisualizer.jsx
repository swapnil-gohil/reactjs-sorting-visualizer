import React from 'react'
import { getMergeSortAnimations, getBubbleSortAnimations, getHeapSortAnimations, getQuickSortFirstAnimations } from '../SortingAlgorithms/SortingAlgorithms'
import './SortingVisualizer.css'

const PRIMARY_COLOR = 'turquoise'
//const SECONDARY_COLOR = 'red';

const ANIMATION_SPEED_MS = 3;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [],
            numInArray: 25
        }
        this.handleReset = this.handleReset.bind(this);
        this.handleSetting = this.handleSetting.bind(this);
    }
    
    componentDidMount() {
        this.handleReset()
    }
    
    handleReset () {
        const newArray = []
        for (let i = 0; i < this.state.numInArray; i++) {
            newArray.push(randomIntFromInterval(5, 360))
        }
        this.setState({ array: newArray })
    }

     handleSetting(e) {
         const name = e.target.name;
         const value = e.target.value;
         this.setState({
           [name]: value
        });
        
    }



    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                //const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                const color = PRIMARY_COLOR
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {
        const animatingArray = getQuickSortFirstAnimations(this.state.array);
        for (let i = 0; i < animatingArray.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const colorChange = i % 4 <= 1;
            if (colorChange) {
            const [barOneIdx, barTwoIdx] = animatingArray[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            //const color = i % 4 === 0 ? onCompareColor : initialColor;
            const color = PRIMARY_COLOR
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
            } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animatingArray[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    heapSort() {
        const animatingArray = getHeapSortAnimations(this.state.array);
        for (let i = 0; i < animatingArray.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
          const colorChange = i % 4 <= 1;
          if (colorChange) {
            const [barOneIdx, barTwoIdx] = animatingArray[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            //const color = i % 4 === 0 ? onCompareColor : initialColor;
            const color = PRIMARY_COLOR
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animatingArray[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
    }
    }
    bubbleSort() {
        const animatingArray = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animatingArray.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const colorChange = i % 4 <= 1;
            if (colorChange) {
            const [barOneIdx, barTwoIdx] = animatingArray[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            //const color = i % 4 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
            const color = PRIMARY_COLOR
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animatingArray[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    render() {
        const { array, numInArray } = this.state
        return (
            <div className='array-container'>
                <div>
                <h1>SORTING VISUALIZER</h1>
                {array.map((value, idx) => (
                    <div className='array-bar' key={idx} style={{backgroundColor: PRIMARY_COLOR, height: `${value}px`}}>
                    </div>
                ))}
                <br></br>
                </div>


                <button onClick={() => this.handleReset()} class='button'>Generate New Array</button>
                <button onClick={() => this.mergeSort()} class='button'>Merge Sort</button>
                <button onClick={() => this.quickSort()} class='button'>Quick Sort</button>
                <button onClick={() => this.heapSort()} class='button'>Heap Sort</button>
                <button onClick={() => this.bubbleSort()} class='button'>Bubble Sort</button>
                
                <br></br>
                <br></br>
                <label>Array Size: </label>
                <br></br>
                <br></br>
                <div className="slidecontainer">
                    <input
                    className="custom-range"
                    name="numInArray"
                    type="range"
                    min="10"
                    max="110"
                    value={this.props.numInArray}
                    onChange={e => this.handleSetting(e)}
                    />
                </div>
                <br></br>
            </div>
            
            
        )
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
