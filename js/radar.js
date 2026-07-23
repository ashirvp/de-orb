/* -------------------------------------------------------------
   DE ORB | TACTICAL C2 RADAR SIMULATION ENGINE
   ------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('radarCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight - 44;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Active Radar Track Targets
  const tracks = [
    { id: 'DE-01', x: 0.35, y: -0.4, vx: 0.001, vy: 0.0006, type: 'RF NODE', threat: 'HIGH' },
    { id: 'DE-02', x: -0.45, y: 0.25, vx: -0.0006, vy: 0.0007, type: 'ACOUSTIC', threat: 'SAFE' },
    { id: 'DE-03', x: 0.25, y: 0.55, vx: -0.0007, vy: -0.0005, type: 'THERMAL / EO-IR', threat: 'ACTIVE' },
    { id: 'DE-04', x: -0.32, y: -0.48, vx: 0.0005, vy: 0.0009, type: 'mmWAVE', threat: 'ACTIVE' },
    { id: 'DE-05', x: 0.58, y: 0.15, vx: -0.0004, vy: -0.0007, type: '5G RADAR', threat: 'TRACKING' }
  ];

  let angle = 0;

  function renderRadar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(cx, cy) - 30;

    // Draw Grid Concentric Rings
    ctx.strokeStyle = 'rgba(51, 226, 122, 0.18)';
    ctx.lineWidth = 1;

    for (let r = 0.25; r <= 1; r += 0.25) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius * r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw Radar Crosshair Lines
    ctx.strokeStyle = 'rgba(51, 226, 122, 0.2)';
    ctx.beginPath();
    ctx.moveTo(cx - radius, cy);
    ctx.lineTo(cx + radius, cy);
    ctx.moveTo(cx, cy - radius);
    ctx.lineTo(cx, cy + radius);
    ctx.stroke();

    // Rotating Radar Sweep Conic Gradient
    angle += 0.016;
    ctx.save();
    ctx.translate(cx, cy);

    const sweepGradient = ctx.createConicGradient(angle, 0, 0);
    sweepGradient.addColorStop(0, 'rgba(51, 226, 122, 0.38)');
    sweepGradient.addColorStop(0.12, 'rgba(51, 226, 122, 0.03)');
    sweepGradient.addColorStop(1, 'transparent');

    ctx.fillStyle = sweepGradient;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    // Sweep Line Edge
    ctx.strokeStyle = '#33E27A';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    ctx.stroke();

    ctx.restore();

    // Draw Node Connection Lines & Targets
    ctx.font = '10px "IBM Plex Mono", monospace';

    tracks.forEach((track) => {
      // Position Update
      track.x += track.vx;
      track.y += track.vy;
      if (Math.abs(track.x) > 0.8) track.vx *= -1;
      if (Math.abs(track.y) > 0.8) track.vy *= -1;

      const tx = cx + track.x * radius;
      const ty = cy + track.y * radius;

      // Dashed Node Mesh Lines to Central DE ORB Node
      ctx.strokeStyle = track.threat === 'HIGH' ? 'rgba(255, 59, 48, 0.4)' : 'rgba(51, 226, 122, 0.28)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      ctx.setLineDash([]);

      // Target Blip
      const isThreat = track.threat === 'HIGH';
      ctx.fillStyle = isThreat ? '#FF3B30' : '#33E27A';
      ctx.shadowColor = isThreat ? '#FF3B30' : '#33E27A';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(tx, ty, isThreat ? 5 : 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Target Text Label
      ctx.fillStyle = isThreat ? '#FF3B30' : '#F5F7F4';
      ctx.fillText(`${track.id} [${track.type}]`, tx + 9, ty - 4);
    });

    // Central DE ORB Core Node
    ctx.fillStyle = '#33E27A';
    ctx.shadowColor = '#33E27A';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#33E27A';
    ctx.fillText("DE ORB NODE (FUSED TRACK 0.87)", cx + 12, cy + 14);

    requestAnimationFrame(renderRadar);
  }

  renderRadar();
});
