// document.getElementById('studentForm').addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const demographics = document.getElementById('demographics').value;
//   const academicHistory = document.getElementById('academicHistory').value;
//   const socialEmotionalFactors = document.getElementById('socialEmotionalFactors').value;
//   const loadingMessage = document.getElementById('loadingMessage');
//   const graduationLikelihoodElement = document.getElementById('graduationLikelihood');
//   const predictionElement = document.getElementById('prediction');
//   const insightsElement = document.getElementById('actionableInsights');
//   const chartElement = document.getElementById('improvementChart');
//   const accuracyChartElement = document.getElementById('accuracyChart');
//   const downloadPdfButton = document.getElementById('downloadPdfButton');

//   if (!demographics || !academicHistory || !socialEmotionalFactors) {
//     alert('Please provide all required information!');
//     return;
//   }

//   // Show loading message
//   loadingMessage.style.display = 'block';

//   // Clear previous output
//   graduationLikelihoodElement.innerHTML = '';
//   predictionElement.innerHTML = '';
//   insightsElement.innerHTML = '';
//   chartElement.style.display = 'none';
//   accuracyChartElement.style.display = 'none';
//   downloadPdfButton.style.display = 'none';

//   try {
//     const response = await fetch('/api/predict', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         demographics,
//         academicHistory,
//         socialEmotionalFactors,
//       }),
//     });

//     const data = await response.json();
//     loadingMessage.style.display = 'none';

//     if (data.likelihood) {
//       graduationLikelihoodElement.innerHTML = `<strong>Likelihood of Graduation:</strong> ${data.likelihood}%`;
//     }

//     if (data.prediction) {
//       predictionElement.innerHTML = `<strong>Prediction:</strong><br>${data.prediction.replaceAll('\n', '<br>')}`;
//     } else {
//       predictionElement.innerHTML = '<strong>Error:</strong> Unable to process the prediction.';
//     }

//     if (data.insights) {
//       insightsElement.innerHTML = `
//         <strong>Actionable Insights:</strong><br>
//         ${data.insights.replaceAll('\n', '<br>')}
//         <p>Sentiment Analysis: ${analyzeSentiment(data.insights)}</p>
//       `;
//     }

//     // Improvement Chart
//     const ctx = chartElement.getContext('2d');
//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['Attendance', 'GPA', 'Assignments Completed', 'Class Participation'],
//         datasets: [{
//           label: 'Potential Improvement',
//           data: data.chartData || [80, 3.5, 7, 4], // Example fallback data
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: { beginAtZero: true }
//         },
//         plugins: {
//           zoom: {
//             pan: { enabled: true, mode: 'xy' },
//             zoom: { enabled: true, mode: 'xy' }
//           }
//         },
//         interaction: { intersect: false },
//       }
//     });
//     chartElement.style.display = 'block';

//     // Accuracy Chart
//     const accuracyCtx = accuracyChartElement.getContext('2d');
//     new Chart(accuracyCtx, {
//       type: 'doughnut',
//       data: {
//         labels: ['Accuracy', 'Error'],
//         datasets: [{
//           data: [data.accuracy || 95, 100 - (data.accuracy || 95)],
//           backgroundColor: ['#4CAF50', '#FF6384']
//         }]
//       }
//     });
//     accuracyChartElement.style.display = 'block';

//     // Show the download button
//     downloadPdfButton.style.display = 'block';
//     downloadPdfButton.onclick = async () => {
//       const pdfWindow = window.open('', '_blank');
//       const improvementChartImage = chartElement.toDataURL('image/png');
//       const accuracyChartImage = accuracyChartElement.toDataURL('image/png');
      
//       pdfWindow.document.write(`
//         <html>
//           <head>
//             <title>Prediction PDF</title>
//           </head>
//           <body>
//             <h1>Student Success Prediction</h1>
//             <h3>${graduationLikelihoodElement.innerHTML}</h3>
//             <p>${predictionElement.innerHTML}</p>
//             <p>${insightsElement.innerHTML}</p>
//             <h3>Improvement Chart:</h3>
//             <img src="${improvementChartImage}" alt="Improvement Chart" style="max-width: 100%; height: auto;">
//             <h3>Accuracy Chart:</h3>
//             <img src="${accuracyChartImage}" alt="Accuracy Chart" style="max-width: 100%; height: auto;">
//           </body>
//         </html>
//       `);
//       pdfWindow.document.close();
//       pdfWindow.print();
//     };

//   } catch (error) {
//     loadingMessage.style.display = 'none';
//     predictionElement.innerHTML = '<strong>Error:</strong> Unable to process the request. Please try again later.';
//   }
// });

// function analyzeSentiment(text) {
//   const positiveWords = ['good', 'great', 'excellent'];
//   const negativeWords = ['bad', 'poor', 'terrible'];

//   let score = 0;
//   text.toLowerCase().split(' ').forEach(word => {
//     if (positiveWords.includes(word)) score += 1;
//     if (negativeWords.includes(word)) score -= 1;
//   });

//   return score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral';
// }
document.getElementById('studentForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const demographics = document.getElementById('demographics').value;
  const academicHistory = document.getElementById('academicHistory').value;
  const socialEmotionalFactors = document.getElementById('socialEmotionalFactors').value;
  const loadingMessage = document.getElementById('loadingMessage');
  const graduationLikelihoodElement = document.getElementById('graduationLikelihood');
  const predictionElement = document.getElementById('prediction');
  const insightsElement = document.getElementById('actionableInsights');
  const chartElement = document.getElementById('improvementChart');
  const accuracyChartElement = document.getElementById('accuracyChart');
  const downloadPdfButton = document.getElementById('downloadPdfButton');

  if (!demographics || !academicHistory || !socialEmotionalFactors) {
    alert('Please provide all required information!');
    return;
  }

  loadingMessage.style.display = 'block';

  // Clear previous outputs
  graduationLikelihoodElement.innerHTML = '';
  predictionElement.innerHTML = '';
  insightsElement.innerHTML = '';
  chartElement.style.display = 'none';
  accuracyChartElement.style.display = 'none';
  downloadPdfButton.style.display = 'none';

  try {
    const response = await fetch('https://sparkling-marigold-40f50f.netlify.app/.netlify/functions/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ demographics, academicHistory, socialEmotionalFactors }),
    });

    const data = await response.json();
    loadingMessage.style.display = 'none';

    if (data.likelihood) {
      graduationLikelihoodElement.innerHTML = `<strong>Likelihood of Graduation:</strong> ${data.likelihood}%`;
    }

    if (data.prediction) {
      predictionElement.innerHTML = `<strong>Prediction:</strong><br>${data.prediction.replaceAll('\n', '<br>')}`;
    } else {
      predictionElement.innerHTML = '<strong>Error:</strong> Unable to process the prediction.';
    }

    if (data.insights) {
      insightsElement.innerHTML = `
        <strong>Actionable Insights:</strong><br>
        ${data.insights.replaceAll('\n', '<br>')}
        <p>Sentiment Analysis: ${analyzeSentiment(data.insights)}</p>
      `;
    }

    // Improvement Chart
    const ctx = chartElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Attendance', 'GPA', 'Assignments Completed', 'Class Participation'],
        datasets: [{
          label: 'Potential Improvement',
          data: data.chartData || [80, 3.5, 7, 4],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
        plugins: {
          zoom: {
            pan: { enabled: true, mode: 'xy' },
            zoom: { enabled: true, mode: 'xy' },
          },
        },
      },
    });
    chartElement.style.display = 'block';

    // Accuracy Chart
    const accuracyCtx = accuracyChartElement.getContext('2d');
    new Chart(accuracyCtx, {
      type: 'doughnut',
      data: {
        labels: ['Accuracy', 'Error'],
        datasets: [{
          data: [data.accuracy || 95, 100 - (data.accuracy || 95)],
          backgroundColor: ['#4CAF50', '#FF6384'],
        }],
      },
    });
    accuracyChartElement.style.display = 'block';

    downloadPdfButton.style.display = 'block';
    downloadPdfButton.onclick = () => {
      const improvementChartImage = chartElement.toDataURL('image/png');
      const accuracyChartImage = accuracyChartElement.toDataURL('image/png');
      const pdfWindow = window.open('', '_blank');
      pdfWindow.document.write(`
        <html>
          <head><title>Prediction PDF</title></head>
          <body>
            <h1>Prediction Results</h1>
            <p>${graduationLikelihoodElement.innerHTML}</p>
            <p>${predictionElement.innerHTML}</p>
            <p>${insightsElement.innerHTML}</p>
            <img src="${improvementChartImage}" alt="Improvement Chart">
            <img src="${accuracyChartImage}" alt="Accuracy Chart">
          </body>
        </html>
      `);
      pdfWindow.document.close();
      pdfWindow.print();
    };
  } catch (error) {
    loadingMessage.style.display = 'none';
    predictionElement.innerHTML = '<strong>Error:</strong> Unable to process the request.';
  }
});

function analyzeSentiment(text) {
  const positiveWords = ['good', 'great', 'excellent'];
  const negativeWords = ['bad', 'poor', 'terrible'];

  let score = 0;
  text.toLowerCase().split(' ').forEach((word) => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });

  return score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral';
}
