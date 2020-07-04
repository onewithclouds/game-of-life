import React, { useState } from "react";

const numRows = 50;
const numCols = 50;

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
	grid.map( row => row.map( col => (

			  <div

//			  key={`${i}-${k}`}
			  style={{
			      width: 20,
			      height: 20,
//			      backgroundColor: ( grid[i][k] ? "pink" : undefined ),
			      border: "solid 1px grey" }}

			  >
			      
			  </div>
			      
		  ))
		)
	)}
    
    console.log(gridDiv());

    return (
	
	<div
	style=
	    {{
	    display: "grid",
	    gridTemplateColumns: `repeat(${numCols}, 20px)`
	    }}

	>
	    
	{gridDiv()}
	
	</div>

    );
};

export default App;
