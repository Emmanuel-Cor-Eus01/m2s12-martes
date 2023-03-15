console.log("Entro index.js");

(()=>{
    console.log("Entro a la funcion anonima turbo!!!");
    const Base_url = "https://animales-api.onrender.com"
    const myChart = document.getElementById('myChart').getContext('2d');
    const tblAnimales = document.getElementById("tblAnimales");
    const loadData = ()=>{
        fetch(Base_url + '/animales',
    {
        method: "GET"
    })
    .then(response => response.json())
    .then(response => {
        console.log(response.data)
        // Esto se realizo para opbtener el arreglo de strings
        let labels_for_chart = response.data.map((animal) => {
            return animal.nombre;
        });
        // Esto se realizo para obtener el arreglo de numeros
        let data_for_chart = response.data.map((animal) => {
            return animal.cantidad;
        });

        const myChart1 = new Chart(myChart, {
            type: 'bar',
            data: {
                labels: labels_for_chart,
                datasets: [{
                    label: 'Animales del Zoologico',
                    data: data_for_chart,
                    fill: true,
                    backgroundColor: '#ccd9ff',
                    borderColor: '#3366ff'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        // Esto es para limpiar si es que ya hay valores
        tblAnimales.innerHTML = "";
        for(const animal of response.data){
            let tr = `
            <tr>
            <td>${animal.id}</td>
            <td>${animal.nombre}</td>
            <td>${animal.cantidad}</td>
            <tr/>
            `
            tblAnimales.innerHTML += tr;
        }
    })
    .catch(error => console.log(error));
    }
    loadData();
})();
