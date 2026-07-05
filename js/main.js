document.addEventListener('DOMContentLoaded', () => {

  function buildRoom(roomSelector, layout, zonaClass) {
    const room = document.querySelector(roomSelector);
    Object.keys(layout).forEach(key => {
      const [x, y, z, rotY] = layout[key];
      const panel = document.createElement('a-entity');
      panel.setAttribute('position', `${x} ${y} ${z}`);
      panel.setAttribute('rotation', `0 ${rotY} 0`);
      panel.setAttribute('gallery-panel', `key:${key}`);
      room.appendChild(panel);
    });
  }

  function buildShell(roomSelector, colors) {
    const room = document.querySelector(roomSelector);
    const floor = document.createElement('a-plane');
    floor.setAttribute('rotation', '-90 0 0'); floor.setAttribute('width', 30); floor.setAttribute('height', 42);
    floor.setAttribute('color', colors.floor); floor.setAttribute('material', 'roughness:0.85; metalness:0.12');
    room.appendChild(floor);

    const ceil = document.createElement('a-plane');
    ceil.setAttribute('rotation', '90 0 0'); ceil.setAttribute('width', 30); ceil.setAttribute('height', 42);
    ceil.setAttribute('position', '0 8.6 0'); ceil.setAttribute('color', colors.ceil);
    room.appendChild(ceil);

    [[0,-21],[0,21]].forEach(([x,z]) => {
      const wall = document.createElement('a-box');
      wall.setAttribute('position', `${x} 4.3 ${z}`); wall.setAttribute('width', 30);
      wall.setAttribute('height', 8.6); wall.setAttribute('depth', 0.4); wall.setAttribute('color', colors.wall);
      room.appendChild(wall);
    });

    const sideWall = document.createElement('a-box');
    sideWall.setAttribute('rotation', '0 90 0');
    sideWall.setAttribute('position', `${colors.sideX} 4.3 0`);
    sideWall.setAttribute('width', 42); sideWall.setAttribute('height', 8.6); sideWall.setAttribute('depth', 0.4);
    sideWall.setAttribute('color', colors.wall);
    room.appendChild(sideWall);

    ['-12', '8'].forEach(zPos => {
      const glow = document.createElement('a-entity');
      glow.setAttribute('light', `type:point; color:${colors.glow}; intensity:1.1; distance:16`);
      glow.setAttribute('position', `0 6.5 ${zPos}`);
      room.appendChild(glow);
    });

    const title = document.createElement('a-text');
    title.setAttribute('value', colors.title); title.setAttribute('align', 'center');
    title.setAttribute('position', '0 6.8 -20.7'); title.setAttribute('width', 15); title.setAttribute('color', colors.titleColor);
    room.appendChild(title);

    const subtitle = document.createElement('a-text');
    subtitle.setAttribute('value', colors.subtitle); subtitle.setAttribute('align', 'center');
    subtitle.setAttribute('position', '0 5.9 -20.7'); subtitle.setAttribute('width', 9); subtitle.setAttribute('color', colors.glow);
    room.appendChild(subtitle);

    const base = document.createElement('a-cylinder');
    base.setAttribute('radius', 1.8); base.setAttribute('height', 0.3); base.setAttribute('color', colors.zoneColor);
    room.appendChild(base);

    const totem = document.createElement('a-entity');
    totem.setAttribute('spin', `speed:${colors.spinDir}`);
    totem.setAttribute('position', '0 1.6 0');
    const cone = document.createElement('a-cone');
    cone.setAttribute('radius-bottom', 1.1); cone.setAttribute('radius-top', 0);
    cone.setAttribute('height', 2.2); cone.setAttribute('color', colors.coneColor);
    totem.appendChild(cone);
    const ring = document.createElement('a-torus');
    ring.setAttribute('radius', 1.3); ring.setAttribute('radius-tubular', 0.05);
    ring.setAttribute('position', '0 -0.9 0'); ring.setAttribute('rotation', '90 0 0'); ring.setAttribute('color', colors.glow);
    totem.appendChild(ring);
    room.appendChild(totem);
  }

  buildShell('#roomNac', {
    floor:'#1b3a2c', ceil:'#0f261d', wall:'#234a37', glow:'#66bb6a',
    title:'GALERIAS NACIONALES', titleColor:'#a5d6a7', subtitle:'Innovacion Educativa en Colombia',
    zoneColor:'#2e7d32', coneColor:'#43a047', spinDir:18, sideX:-15
  });
  buildShell('#roomIntl', {
    floor:'#152a3f', ceil:'#0c1a29', wall:'#1e3d5c', glow:'#42a5f5',
    title:'GALERIAS INTERNACIONALES', titleColor:'#90caf9', subtitle:'Modelos Educativos de Referencia Mundial',
    zoneColor:'#1565c0', coneColor:'#1e88e5', spinDir:-18, sideX:15
  });

  buildRoom('#roomNac', LAYOUT_NAC);
  buildRoom('#roomIntl', LAYOUT_INTL);

  document.querySelector('#avatarRig').setAttribute('body-walk', '');

  // ===== Sistema de logros / progreso =====
  const visited = new Set();
  window.onPlayerMove = function (pos) {
    const dot = document.getElementById('mm-dot');
    if (dot) {
      const mapX = 73 + (pos.x / 40) * 60;
      const mapY = 50 + (pos.z / 22) * 30;
      dot.style.left = Math.max(6, Math.min(140, mapX)) + 'px';
      dot.style.top = Math.max(20, Math.min(78, mapY)) + 'px';
    }
  };

  window.openStation = function (key) {
    const s = STATIONS[key];
    document.getElementById('modalImg').src = s.img;
    const body = document.getElementById('modalBody');
    body.className = s.zona;
    body.innerHTML = `
      <span class="tag ${s.zona}">${s.zona === 'nac' ? 'Galería Nacional' : 'Galería Internacional'}</span>
      <h2>${s.nombre}</h2>
      <h4>Contexto educativo</h4><p>${s.contexto}</p>
      <h4>Enfoque pedagógico</h4><p>${s.enfoque}</p>
      <h4>Metodología activa</h4><p>${s.metodologia}</p>
      <h4>Uso de TICs</h4><p>${s.tics}</p>
      <h4>Aportes innovadores</h4><p>${s.aportes}</p>`;
    document.getElementById('modalOverlay').style.display = 'flex';

    if (!visited.has(key)) {
      visited.add(key);
      document.getElementById('progressLabel').textContent = `Estaciones visitadas: ${visited.size} / 10`;
      document.getElementById('progressFill').style.width = (visited.size / 10 * 100) + '%';
      showToast(`✓ Caso desbloqueado: ${s.nombre.split('—')[0].trim()}`);
      if (visited.size === 10) setTimeout(() => showToast('🏆 ¡Museo completado! Visitaste las 10 galerías.'), 600);
    }
  };

  document.getElementById('closeBtn').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', (e) => { if (e.target.id === 'modalOverlay') closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  function closeModal() { document.getElementById('modalOverlay').style.display = 'none'; }

  let toastTimer;
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
  }

  const scene = document.querySelector('a-scene');
  const hideLoading = () => document.getElementById('loading').style.display = 'none';
  scene.hasLoaded ? hideLoading() : scene.addEventListener('loaded', hideLoading);
});
