// Socket.io: Verbindung zum Server herstellen
// Die socket Variable enthält eine Verbindung zum Server.
import 'datatables.net';
import socket from '../../socket';
import DataTable from 'datatables.net-dt';

// Mit socket.on() können wir auf Ereignisse vom Server reagieren.
// Hier reagieren wir auf das Ereignis matrix, das uns die aktuelle Matrix vom Server sendet.
/*socket.on(, () => {
});*/

// wir können hier auch auf andere Ereignisse reagieren, die der Server sendet
// socket.on('someEvent', (data) => {
let table;
socket.on('setupTable', (data) => {
  table = new DataTable('#playerAdminTable', {
  data: data,
      columns: [
        { data: 'uuid' },
        { data: 'name' },
        { data: 'created_at' }
      ],
      responsive: true
    });
  });


socket.on('playerData', (data) => {
  //console.log('Received table data:', data); // Log the received data for debugging
  if (DataTable.isDataTable('#playerAdminTable')) {
    // Update data in existing DataTable
    table.clear().rows.add(data).draw();
  }
});


 
