const socket = io();

const usdArr = [];


socket.on('crypto-prices', tickerdata => {
	refreshTicker(tickerdata);
});


function refreshTicker(tickerdata) {
	const tblBTC = document.getElementById("btc-ticker");
	const tblRow = tblBTC.getElementsByTagName("tr");
	let rowCnt = 0;

	tickerdata.map((item) => {
		for (let i = 0; i < tblRow.length; i++) {
			const tblCol = tblRow[i].getElementsByTagName("td")[0];
      if (tblCol) {
				const txtValue = tblCol.getAttribute('data-currency');
        if (txtValue === '' || txtValue === item.target) {
          tblBTC.deleteRow(i);
        }
      }   
		}

		const tblBTCbody = document.getElementById('btct-icker').getElementsByTagName('tbody')[0];
		const newRow = tblBTCbody.insertRow(rowCnt);
		const cell1 = newRow.insertCell(0);
		const cell2 = newRow.insertCell(1);
		// const cell3 = newRow.insertCell(2);
		// const cell4 = newRow.insertCell(3);
		// const cell5 = newRow.insertCell(4);
		cell1.innerHTML = printCurrency(item.target);
		cell1.setAttribute('data-currency', item.target);
		cell2.innerHTML = item.price;
		cell3.innerHTML = item.volume;
		cell4.innerHTML = item.change;
		cell5.innerHTML = '<span id="sparkline-' + item.target +'"></span>';
		drawSparkline(item.target, item.price);
		rowCnt++;
	});

	tapeTicker(tickerdata);
}

