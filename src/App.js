import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

const numRows = 50;
const numCols = 50;

const operations = [
    
    [ 0,  1],
    [ 0, -1],
    [ 1,  0],
    [ 1,  1],
    [ 1, -1],
    [-1,  0],
    [-1,  1],
    [-1, -1]
    
];

const App = () => {
    
    const [grid, setGrid] = useState( () => {
	const gridInit = [];

	for (let i = 0; i < numRows; i++) {
	    console.log(gridInit);
	    gridInit.push( Array.from( Array(numCols), () => 0) )
	}
	
	return gridInit;
    });

    console.log(grid);

    const gridDiv = () => {
	return (
	    grid.map( (row, i) => row.map( (col, k) => (

		    <div
		
		onClick={ () => {
		    const newGrid = produce(grid, draft => {
			draft[i][k] = grid[i][k] ? 0 : 1;
		    });
		    setGrid(newGrid);		    
		}}
		    
		key={`${i}-${k}`}
		style={{
		    width: 20,
		    height: 20,
		    backgroundColor: ( grid[i][k] ? "pink" : undefined ),
		    border: "solid 1px grey" }}

		    >    
		    </div>
			      
	))))
    }

    const [running, setRunning] = useState(false);

    const runningRef = useRef();
    
    runningRef.current = running;


    const runSimulation = useCallback( () => {
	if (!runningRef.current) {
	    return;
	}
	setGrid( g => {
	    return produce( g, gridCopy => {
		for (let i = 0; i < numRows; i++) {
		    for (let k = 0; k < numCols; k++) {
			let neighbours = 0;
			operations.forEach(([x, y]) => {
			    const newI = i + x;
			    const newK = k + y;
			    if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
				neighbours += g[newI][newK]
			    }
			})

			if (neighbours < 2 || neighbours > 3) {
			    gridCopy[i][k] = 0;
			}
			else if ( g[i][k] === 0 && neighbours === 3) {
			    gridCopy[i][k] = 1;
			}
		    }
		}
	    });
	});
	setTimeout(runSimulation, 1000);
    }, []);
    
    
    console.log(gridDiv());

    return (
	<>

	<button
	onClick={ () => {
	    setRunning(!running);
	    runningRef.current = true;
	    runSimulation();
	}}
	>
	    { running ? "stop" : "start" }
	</button>

	
	<div
	style=
	    {{
	    display: "grid",
	    gridTemplateColumns: `repeat(${numCols}, 20px)`
	    }}

	>
	    
	{gridDiv()}
	
	</div>

	</>
    );
};

export default App;
