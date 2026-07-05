// Componente: convierte cada estación en un cuadro clicable con marco, spotlight e imagen
AFRAME.registerComponent('gallery-panel', {
  schema: { key: {type:'string'} },
  init: function () {
    const s = STATIONS[this.data.key];
    const zoneColor = s.zona === 'nac' ? '#43a047' : '#1e88e5';
    const frameColor = '#e8b84b';
    const bg = s.zona === 'nac' ? '#152018' : '#0d1e30';

    const frame = document.createElement('a-plane');
    frame.setAttribute('width', 4.7); frame.setAttribute('height', 4.05);
    frame.setAttribute('position', '0 0 -0.03');
    frame.setAttribute('material', `color:${frameColor}; metalness:0.55; roughness:0.35`);
    this.el.appendChild(frame);

    const inner = document.createElement('a-plane');
    inner.setAttribute('width', 4.35); inner.setAttribute('height', 3.72);
    inner.setAttribute('position', '0 0 -0.02');
    inner.setAttribute('color', bg);
    this.el.appendChild(inner);

    const img = document.createElement('a-image');
    img.setAttribute('src', s.img);
    img.setAttribute('width', 3.9); img.setAttribute('height', 2.5);
    img.setAttribute('position', '0 0.42 0.02');
    this.el.appendChild(img);

    const label = document.createElement('a-text');
    label.setAttribute('value', s.nombre.length > 34 ? s.nombre.slice(0,32)+'…' : s.nombre);
    label.setAttribute('align', 'center');
    label.setAttribute('position', '0 -1.38 0.02');
    label.setAttribute('width', 4.6);
    label.setAttribute('color', '#eef3f8');
    this.el.appendChild(label);

    const light = document.createElement('a-entity');
    light.setAttribute('light', `type:spot; color:#fffde7; intensity:1.35; angle:38; penumbra:0.45; target:#none`);
    light.setAttribute('position', '0 2.6 2.6');
    light.setAttribute('rotation', '-42 0 0');
    this.el.appendChild(light);

    const accent = document.createElement('a-plane');
    accent.setAttribute('width', 4.7); accent.setAttribute('height', 0.08);
    accent.setAttribute('position', '0 -2.02 -0.02');
    accent.setAttribute('color', zoneColor);
    this.el.appendChild(accent);

    const hit = document.createElement('a-plane');
    hit.setAttribute('width', 4.7); hit.setAttribute('height', 4.3);
    hit.setAttribute('position', '0 0 0.1');
    hit.setAttribute('material', 'opacity:0; transparent:true');
    hit.setAttribute('class', 'clickable');
    hit.dataset.key = this.data.key;
    hit.addEventListener('click', () => window.openStation(this.data.key));
    hit.addEventListener('mouseenter', () => this.el.setAttribute('animation__hover', 'property: scale; to: 1.06 1.06 1.06; dur: 180'));
    hit.addEventListener('mouseleave', () => this.el.setAttribute('animation__hover', 'property: scale; to: 1 1 1; dur: 180'));
    this.el.appendChild(hit);
  }
});

// Tótem central decorativo con rotación continua
AFRAME.registerComponent('spin', {
  schema: { speed:{default:20} },
  tick: function (time, delta) {
    this.el.object3D.rotation.y += THREE.MathUtils.degToRad(this.data.speed * delta / 1000);
  }
});

// Avatar: el cuerpo gira según el yaw de la cámara y anima piernas/brazos al caminar.
// La cámara es HIJA del mismo rig que tiene wasd-controls, así que jamás se desincroniza.
AFRAME.registerComponent('body-walk', {
  init: function () {
    this.last = new THREE.Vector3();
    this.t = 0;
    this.cam = document.querySelector('#playerCam');
    this.body = document.querySelector('#avatarBody');
  },
  tick: function (time, delta) {
    const pos = this.el.object3D.position;
    const dist = pos.distanceTo(this.last);
    this.last.copy(pos);
    const moving = dist > 0.0006;

    if (this.cam && this.body) this.body.object3D.rotation.y = this.cam.object3D.rotation.y;

    this.t += moving ? delta * 0.016 : 0;
    const swing = moving ? Math.sin(this.t * 6) * 25 : 0;
    const legL = document.querySelector('#legL'), legR = document.querySelector('#legR');
    const armL = document.querySelector('#armL'), armR = document.querySelector('#armR');
    if (legL) legL.object3D.rotation.x = THREE.MathUtils.degToRad(swing);
    if (legR) legR.object3D.rotation.x = THREE.MathUtils.degToRad(-swing);
    if (armL) armL.object3D.rotation.x = THREE.MathUtils.degToRad(-swing * 0.7);
    if (armR) armR.object3D.rotation.x = THREE.MathUtils.degToRad(swing * 0.7);

    // Actualiza minimapa y detecta cercanía a estaciones para el sistema de logros
    if (window.onPlayerMove) window.onPlayerMove(pos);
  }
});
