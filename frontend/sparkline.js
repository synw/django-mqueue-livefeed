import sparkline from "@fnando/sparkline";

function drawSparkline(values) {
  sparkline(document.querySelector(".sparkline"), values);
}

export default drawSparkline;