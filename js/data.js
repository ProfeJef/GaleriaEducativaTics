// Datos completos de las 10 estaciones del museo (con tildes correctas)
const STATIONS = {
  n1: {
    zona:'nac', nombre:'I.E. San Mateo — Soacha, Cundinamarca',
    img:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80',
    contexto:'Institución oficial de grado séptimo que enfrentaba baja motivación hacia las ciencias exactas y escasa participación femenina en áreas STEM.',
    enfoque:'Aprendizaje basado en STEM con flexibilización curricular y trabajo interdisciplinar entre matemáticas, tecnología y ciencias naturales.',
    metodologia:'Aprendizaje Basado en Proyectos (ABP) centrado en el pensamiento computacional mediante retos de programación y construcción robótica.',
    tics:'Kits de robótica educativa, tarjetas programables tipo micro:bit y entornos de programación por bloques.',
    aportes:'Incremento medible en la vinculación de estudiantes —incluyendo niñas— a disciplinas STEM y mejora en la resolución colaborativa de problemas.'
  },
  n2: {
    zona:'nac', nombre:'Colegio Gabriel Betancourt Mejía — Bogotá',
    img:'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=80',
    contexto:'Colegio público distrital enfocado en acercar la tecnología y la ingeniería a estudiantes bajo el programa "Un TE STEM".',
    enfoque:'Educación STEM integrada, promoviendo el "usa, modifica y crea" como ruta progresiva de apropiación tecnológica.',
    metodologia:'Talleres prácticos de programación guiada y aprendizaje experiencial con dispositivos físicos programables.',
    tics:'Tarjetas micro:bit, sensores y programación por bloques para automatizar sistemas simples.',
    aportes:'Democratización del acceso a la ingeniería desde edades tempranas y articulación con redes internacionales de innovación STEM.'
  },
  n3: {
    zona:'nac', nombre:'I.E. Jorge Eliécer Gaitán — Medellín',
    img:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80',
    contexto:'Aula de transición (preescolar) que buscaba potenciar el pensamiento crítico y creativo desde los primeros años escolares.',
    enfoque:'Enfoque STEM+ combinado con eduentretenimiento, situando el juego como vehículo legítimo de aprendizaje.',
    metodologia:'Gamificación integral del aula: retos, insignias y narrativas lúdicas conectadas a contextos reales.',
    tics:'Aplicaciones educativas interactivas y recursos multimedia adaptados a la primera infancia.',
    aportes:'Transformación de prácticas pedagógicas tradicionales en experiencias significativas desde los 5 años.'
  },
  n4: {
    zona:'nac', nombre:'ETITC — Instituto Técnico Central, Bogotá',
    img:'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80',
    contexto:'Formación técnica media enfocada en competencias ciudadanas y seguridad vial mediante proyectos tecnológicos.',
    enfoque:'Aprendizaje situado a través de simulación de entornos urbanos reales para enseñar normas de tránsito.',
    metodologia:'Aprendizaje basado en videojuegos serios (Serious Games) diseñados y programados por los propios estudiantes.',
    tics:'Plataforma CoSpaces para creación de entornos virtuales 3D navegables y programables.',
    aportes:'Los estudiantes pasan de consumidores a creadores de contenido inmersivo.'
  },
  n5: {
    zona:'nac', nombre:'I.E. Rural Cuturú (Proyecto DIVA) — Caucasia',
    img:'https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=900&q=80',
    contexto:'Zona rural con recursos limitados que requería fortalecer resolución de problemas ligada al contexto local.',
    enfoque:'Pedagogía crítica situada que articula arte, creatividad y trabajo en equipo como ejes transversales.',
    metodologia:'Aprendizaje colaborativo por proyectos con producciones artísticas y comunitarias como evidencia.',
    tics:'Herramientas digitales de bajo costo y recursos audiovisuales sencillos.',
    aportes:'Modelo replicable de innovación educativa en contextos rurales, centrado en la identidad territorial.'
  },
  i1: {
    zona:'intl', nombre:'Sistema Educativo de Finlandia',
    img:'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80',
    contexto:'Sistema público unificado y gratuito, reconocido mundialmente por su equidad y resultados en pruebas PISA.',
    enfoque:'Educación centrada en el bienestar, con currículo por fenómenos (Phenomenon-Based Learning).',
    metodologia:'Proyectos interdisciplinarios donde los estudiantes investigan temas reales integrando varias materias.',
    tics:'Plataformas digitales de seguimiento personalizado y herramientas colaborativas en la nube.',
    aportes:'Alta autonomía docente y evaluación formativa sin pruebas estandarizadas tempranas.'
  },
  i2: {
    zona:'intl', nombre:'High Tech High — San Diego, Estados Unidos',
    img:'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80',
    contexto:'Red de escuelas públicas charter fundada en 2000, referente global del Aprendizaje Basado en Proyectos.',
    enfoque:'"Deeper Learning": conocimiento aplicado con propósito real y producto público como evidencia.',
    metodologia:'Proyectos extensos e interdisciplinarios que culminan en exhibiciones públicas.',
    tics:'Talleres de diseño digital, fabricación (makerspaces) y documentación digital de portafolios.',
    aportes:'Eliminación de exámenes estandarizados internos y evaluación por rúbricas de competencias.'
  },
  i3: {
    zona:'intl', nombre:'Fundación Escuela Nueva — Reconocimiento Global',
    img:'https://images.unsplash.com/photo-1580894732930-0babd100d356?w=900&q=80',
    contexto:'Modelo pedagógico originado en zonas rurales colombianas, adoptado en más de 20 países.',
    enfoque:'Aprendizaje centrado en el estudiante y aprendizaje entre pares en aulas multigrado.',
    metodologia:'Guías de aprendizaje autoinstructivas combinadas con trabajo cooperativo rotativo.',
    tics:'Bibliotecas digitales rurales y aplicaciones offline para conectividad limitada.',
    aportes:'Escalabilidad comprobada en contextos de pobreza, con impacto en más de 5 millones de estudiantes.'
  },
  i4: {
    zona:'intl', nombre:'Método Singapur de Matemáticas',
    img:'https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=900&q=80',
    contexto:'Currículo nacional de Singapur, líder recurrente en TIMSS y PISA en el área de matemáticas.',
    enfoque:'Progresión Concreto-Pictórico-Abstracto (CPA) antes del simbolismo formal.',
    metodologia:'Resolución de problemas mediante representaciones visuales (bar modeling) y manipulables físicos.',
    tics:'Simuladores interactivos de modelos de barras y práctica adaptativa con retroalimentación inmediata.',
    aportes:'Dominio de menos temas con mayor profundidad, reduciendo la memorización mecánica.'
  },
  i5: {
    zona:'intl', nombre:'Rocketship Public Schools — Estados Unidos',
    img:'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=900&q=80',
    contexto:'Red de escuelas públicas para comunidades de bajos ingresos, con foco en cerrar brechas de aprendizaje.',
    enfoque:'Aprendizaje híbrido (Blended Learning) combinando instrucción personalizada con estaciones digitales.',
    metodologia:'Rotación por estaciones: pequeños grupos con docente, colaborativo entre pares y práctica individual.',
    tics:'Software de aprendizaje adaptativo que ajusta dificultad según desempeño en tiempo real.',
    aportes:'Uso de datos de desempeño para personalizar rutas de aprendizaje individuales.'
  }
};

// Posiciones relativas dentro de cada sala (offset respecto al origen de #roomNac / #roomIntl)
const LAYOUT_NAC  = { n1:[-11,2.5,-14,0], n2:[-11,2.5,-4,0], n3:[-11,2.5,6,0], n4:[10,2.5,-14,180], n5:[10,2.5,-4,180] };
const LAYOUT_INTL = { i1:[-10,2.5,-14,180], i2:[-10,2.5,-4,180], i3:[-10,2.5,6,180], i4:[11,2.5,-14,0], i5:[11,2.5,-4,0] };
