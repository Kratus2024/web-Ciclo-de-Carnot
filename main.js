let grafica= null;
function calcular(){
  let Th_c = parseFloat(document.getElementById("Th_c").value);
  let Tc_c = parseFloat(document.getElementById("Tc_c").value);
  let Qh   = parseFloat(document.getElementById("Qh").value);
  let W  = parseFloat(document.getElementById("W").value);

  if (isNaN(Th_c) || isNaN(Tc_c) || isNaN(Qh) || Qh<=0 || Th_c<=-273.15 || Tc_c<=-273.15) {
    alert("Datos inválidos");
    return;
  }
  if (Th_c <= Tc_c) {
    document.getElementById("mensaje").innerHTML = "Imposible";
    return;
  }


  let Th = Th_c + 273.15;
  let Tc = Tc_c + 273.15;
  let rendimiento = 1 - (Tc/Th);
  let Wmax = rendimiento * Qh;
  let Qc = Qh - Wmax;

  document.getElementById("resultado").innerHTML =
    "Th = " + Th.toFixed(2) + " K<br>" +
    "Tc = " + Tc.toFixed(2) + " K<br>" +
    "Eficiencia = " + (rendimiento*100).toFixed(2) + "%<br>" +
    "Trabajo máximo = " + Wmax.toFixed(2) + " J<br>" +
    "Calor rechazado = " + Qc.toFixed(2) + " J";


//Verificación de que el trabajo ingresado no supere el valor téorico del ciclo de carnot
  let mensaje = "";
  if (!isNaN(W) && W > Wmax) {
    document.getElementById("mensaje").innerHTML =
        "Error: El trabajo ingresado (" + W.toFixed(2) + " J) supera el trabajo máximo de Carnot (" +
        Wmax.toFixed(2) + " J). Este ciclo es imposible según la Segunda Ley de la Termodinámica.";
    return;
}
  if (!isNaN(W)) {
    if (Math.abs(W-Wmax)<1e-6) mensaje="Máquina ideal de Carnot";
    else if (W<Wmax) mensaje="Máquina térmica posible";
    else mensaje="Este ciclo es imposible teniendo en cuenta las leyes de la termodinámica";
  } else {
    mensaje="El usuario no ingresó trabajo, solo valores de temperatura y calor.";
  }
  document.getElementById("mensaje").innerHTML = mensaje;

  document.getElementById("interp").innerHTML =
    "1. La eficiencia nos indica qué fracción del calor o energía se convierte en trabajo realizado por la máquina.<br>" +
    "2. Subir la temperatura del foco caliente (Th) aumenta la eficiencia.<br>" +
    "3. El trabajo máximo que puede producir una máquina de Carnot es <b>" + Wmax.toFixed(2) + "J</b>. Ninguna máquina real puede superar este valor.<br>" +
    "3. La máquina absorbe <b>" + Qh.toFixed(2) + " J</b> de energía térmica del foco caliente.<br>" +
    "4. Bajar la temperatura del foco frio (Tc) también la mejora.<br>" +
    "5. El ciclo de Carnot fija el límite máximo de eficiencia.<br>" +
    "6. Las máquinas reales nunca alcanzan ese límite.<br>"+
    "7. Una eficiencia del 100% solo sería posible si Tc = 0 K (cero absoluto), condición físicamente inalcanzable.<br> "+
    "8. El calor rechazado al foco frío es <b>" + Qc.toFixed(2) +  " J</b>. Esto demuestra que no todo el calor absorbido puede convertirse en trabajo, de acuerdo con la Segunda Ley de la Termodinámica.";

    
const ctx = document.getElementById("graficaCarnot").getContext("2d");

if(grafica){
    grafica.destroy();
}

grafica = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Calor absorbido (Qh)', 'Trabajo (W)', 'Calor rechazado (Qc)'],
        datasets: [{
            label: 'Energía (J)',
            data: [Qh, Wmax, Qc]
        }]
    },
    options: {
        responsive: true,
        plugins:{
            title:{
                display:true,
                text:'Balance Energético del Ciclo de Carnot'
            }
        },
        scales:{
            y:{
                beginAtZero:true
            }
        }
    }
});
}

