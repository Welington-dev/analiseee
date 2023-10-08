
document.addEventListener("DOMContentLoaded", function () {
    // Defina os dados iniciais para cada coluna
    const initialColumnsData = [0, 0, 0];
    const selectedNumbers = [];
    let numeroZeroClicado = false; 
   

    // Variáveis para rastrear as porcentagens das dúzias
    let percentDuzia1 = 0;
    let percentDuzia2 = 0;
    let percentDuzia3 = 0;

    // Variáveis para rastrear as porcentagens das colunas
    let percentColuna1 = 0;
    let percentColuna2 = 0;
    let percentColuna3 = 0;

    
    let totalCliques = 0;
    // Configuração do gráfico de colunas

    let duzia;
    let coluna;

     // Adicione um evento de clique ao número zero
    const numeroZero = document.querySelector('.number.zero');
    numeroZero.addEventListener('click', () => {
       // Exiba o número zero diretamente quando clicado
        const selectedNumbersContainer = document.querySelector('.selected-numbers-container');
        const numberSpan = document.createElement('span');
        numberSpan.textContent = '0';
        numberSpan.classList.add('number', 'zero');
        selectedNumbersContainer.appendChild(numberSpan);

        numeroZeroClicado = true; // Defina como true para evitar repetições

    });





    const columnsCtx = document.getElementById("columnsChart").getContext("2d");
    const columnsChart = new Chart(columnsCtx, {
        type: 'bar',
        data: {
            labels: ["C1", "C2", "C3"],
            datasets: [
                {
                    label: "C1",
                    data: initialColumnsData,
                    backgroundColor: ["#ff00ff","#f21e1e", "#ffff00"],
                    borderRadius: 10,
                },
                {
                    label: "C2",
                    data: initialColumnsData,
                    backgroundColor: ["#dc3545"],
                    borderRadius: 10,
                },
                {
                    label: "C3",
                    data: initialColumnsData,
                    backgroundColor: "#ffc107",
                    borderRadius: 10,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    min: 0,
                    max: 40, // Defina um valor máximo para o eixo Y do gráfico
                    stepSize: 1,
                },
            },
        },
    });

    columnsCtx.canvas.style.backgroundColor = "#f0f0f0";
    columnsCtx.canvas.style.borderLeft = "2px solid black"; // Adiciona borda esquerda ao gráfico
    columnsCtx.canvas.style.border = "2px solid black";
    columnsCtx.canvas.style.borderRadius = "10px";

    // Ouvinte de evento de clique para os números da mesa de roleta
    const rouletteTable = document.querySelector(".roulette-table");

    rouletteTable.addEventListener("click", function (event) {
        if (event.target.classList.contains("number")) {
            const numero = parseInt(event.target.getAttribute("data-numero")); // Converte para número inteiro
              // Atualize o conteúdo do elemento "roulette-numbers"

           

            // Verificar se 'numero' é um número válido (1 a 36)
            if (!isNaN(numero) && numero >= 1 && numero <= 36) {
                // Determine a Dúzia com base no número selecionado
                let duzia;
    
                if (numero >= 1 && numero <= 12) {
                    duzia = 1; // Dúzia 1
                    percentDuzia1 += 1; // Incremento de 1
                    
                    
                } else if (numero >= 13 && numero <= 24) {
                    duzia = 2; // Dúzia 2
                    percentDuzia2 += 1; // Incremento de 1
                    
                   
                } else if (numero >= 25 && numero <= 36) {
                    duzia = 3; // Dúzia 3
                    percentDuzia3 += 1; // Incremento de 1
                    
                    
                }

                // Determine a Coluna com base no número selecionado
                let coluna;
    
                if ([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].includes(numero)) {
                    coluna = 1;
                    percentColuna1 += 1; // Incremento de 1
                    
                } else if ([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].includes(numero)) {
                    coluna = 2;
                    percentColuna2 += 1; // Incremento de 
                    
                } else if ([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].includes(numero)) {
                    coluna = 3;
                    percentColuna3 += 1; // Incremento de 1
                   
                }
    
                // Atualize o número total de cliques
                totalCliques++;
    
                // Atualize o gráfico de colunas
                updateColumnsChart();
    
                // Atualize o gráfico de dúzias
                updateDuziasChart();
    
                // Atualize as barras de porcentagem
                updatePercentageBars();

             
                  // Atualize o conteúdo da área reservada
                 const selectedNumbersContainer = document.querySelector(".selected-numbers-container");
                 const numberSpan = document.createElement("span");
                 numberSpan.textContent = numero;
                 numberSpan.classList.add(`number`, `duzia-${duzia}`, `coluna-${coluna}`);
                                         
                                   
                    // Adicione um evento de clique ao número adicionado
                  numberSpan.addEventListener('click', () => {
                   if (numberSpan.classList.contains('selected')) {
                      // Se o número já estiver selecionado, remova a seleção
                    numberSpan.classList.remove('selected');
                   } else {
                      // Se o número não estiver selecionado, adicione a seleção
                    numberSpan.classList.add('selected');
                   }
                });
          
                
                   

                 selectedNumbersContainer.appendChild(numberSpan);

    
                            
            }

        }
    });

    // Função para atualizar o gráfico de colunas
    function updateColumnsChart() {
        const data = [
            percentColuna1,
            percentColuna2,
            percentColuna3
        ];

        columnsChart.data.datasets[0].data = data;
        columnsChart.update();
    }

    // Função para atualizar o gráfico de dúzias
    function updateDuziasChart() {
        const data = [
            percentDuzia1,
            percentDuzia2,
            percentDuzia3
        ];

        dozensChart.data.datasets[0].data = data;
        dozensChart.update();
    }

    // Função para atualizar as barras de porcentagem
    function updatePercentageBars() {
        const percentageBars = document.querySelectorAll('.percentage-bar');

        percentageBars[0].innerHTML = `D1 <hr>${percentDuzia1.toFixed(1)}%`;
        percentageBars[1].innerHTML = `D2 <hr>${percentDuzia2.toFixed(1)}%`;
        percentageBars[2].innerHTML = `D3 <hr>${percentDuzia3.toFixed(1)}%`;
        percentageBars[3].innerHTML = `C1 <hr>${percentColuna1.toFixed(1)}%`;
        percentageBars[4].innerHTML = `C2 <hr>${percentColuna2.toFixed(1)}%`;
        percentageBars[5].innerHTML = `C3 <hr>${percentColuna3.toFixed(1)}%`;
    }
     
    // Resto do seu código...

    // Dados para o gráfico de dezenas
    const dozensData = {
        labels: [
            "D1 (1-12)", "D2 (13-24)", "D3 (25-36)",
        ],
        datasets: [
            {
                label: "D1",
                backgroundColor: ["#76c7fc", "#65FA61", "#FAAA49"],
                borderRadius: 10,
            },
            {
                label: "D2",
                backgroundColor: ["#65FA61"],
                borderRadius: 10,
            },
            {
                label: "D3",
                backgroundColor: ["#FAAA49"],
                borderRadius: 10,
            },
        ],
    };

    // Configuração do gráfico de dezenas
    const dozensCtx = document.getElementById("dozensChart").getContext("2d");
    const dozensChart = new Chart(dozensCtx, {
        type: 'bar',
        data: dozensData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    min: 0,
                    max: 36,
                },
            },
        },
    });

    dozensCtx.canvas.style.backgroundColor = "#f0f0f0";
    dozensCtx.canvas.style.borderRight = "2px solid black"; // Adiciona borda direita ao gráfico
    dozensCtx.canvas.style.border = "2px solid black";
    dozensCtx.canvas.style.borderRadius = "10px";
});
