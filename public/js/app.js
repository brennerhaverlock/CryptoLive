const socket = io();

const usdArr = [];
const gbpArr = [];
const eurArr = [];
const jpyArr = [];


socket.on('btc-prices', tickerdata => {
    refreshBTCTicker(tickerdata);
});

socket.on('eth-prices', tickerdata => {
    refreshETHTicker(tickerdata);
});


function refreshBTCTicker(tickerdata) {
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

		const tblBTCbody = document.getElementById('btc-ticker').getElementsByTagName('tbody')[0];
		const newRow = tblBTCbody.insertRow(rowCnt);
		const cell1 = newRow.insertCell(0);
		const cell2 = newRow.insertCell(1);
		const cell3 = newRow.insertCell(2);
		const cell4 = newRow.insertCell(3);
		const cell5 = newRow.insertCell(4);
		cell1.innerHTML = printCurrency(item.target);
		cell1.setAttribute('data-currency', item.target);
		cell2.innerHTML = item.price;
		cell3.innerHTML = item.volume;
		cell4.innerHTML = item.change;
		rowCnt++;
	});
}


function refreshETHTicker(tickerdata) {
    const tblETH = document.getElementById("eth-ticker");
    

	const tblRow = tblETH.getElementsByTagName("tr");
	let rowCnt = 0;

	tickerdata.map((item) => {
		for (let i = 0; i < tblRow.length; i++) {
			const tblCol = tblRow[i].getElementsByTagName("td")[0];
      if (tblCol) {
				const txtValue = tblCol.getAttribute('data-currency');
        if (txtValue === '' || txtValue === item.target) {
          tblETH.deleteRow(i);
        }
      }   
		}

		const tblETHbody = document.getElementById('eth-ticker').getElementsByTagName('tbody')[0];
		const newRow = tblETHbody.insertRow(rowCnt);
		const cell1 = newRow.insertCell(0);
		const cell2 = newRow.insertCell(1);
		const cell3 = newRow.insertCell(2);
		const cell4 = newRow.insertCell(3);
		const cell5 = newRow.insertCell(4);
		cell1.innerHTML = printCurrency(item.target);
		cell1.setAttribute('data-currency', item.target);
		cell2.innerHTML = item.price;
		cell3.innerHTML = item.volume;
		cell4.innerHTML = item.change;
		rowCnt++;
	});

}

function formatDate() {
	const date = new Date();
	const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
	const [{ value: mn },,{ value: day },,{ value: yr},,{ value: hr},,{ value: min},,{ value: sec}] = dateTimeFormat.formatToParts(date);
	return `${day}-${mn}-${yr} ${hr}:${min}:${sec}`;
}

function printCurrency(currency) {
	switch(currency) {
		case 'USD':
            return '<span class="currency">$</span>';
        case 'GBP':
			return '<span class="currency">&pound;</span>';
		case 'EUR':
			return '<span class="currency">&euro;</span>';
		case 'JPY':
			return '<span class="currency">&yen;</span>';
	}
}

