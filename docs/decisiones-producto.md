# HandyFEM — Decisiones de producto

Registro de decisiones tomadas en las sesiones de kickoff. Separar lo **decidido**
de lo que sigue **en discusión** para no perder el hilo.

Última actualización: 2026-06-01

---

## ✅ Decisiones tomadas

### Identidad del producto (ya en handyfem-specs.md)
- **Qué es:** PWA directorio/marketplace de mujeres profesionales de oficios, modelo
  **"contacto directo, sin intermediarios"** (no es plataforma de booking con transacción).
- **Para quién:** dos lados — clienta (rol base) + profesional (rol activable). Una
  cuenta puede tener ambos roles.
- **Geografía:** España, filtro por ciudad declarada (sin GPS en MVP). Lanzamiento en Barcelona.
- **Plataforma:** PWA mobile-first.
- **Idioma:** Español.

### Monetización
- **MVP: 100% gratis.** Sin modelo de ingresos al arranque (prioridad: conseguir masa
  crítica de profesionales y clientas). El modelo de ingresos se define en v2.

### Verificación (MVP)
- El badge **"Verificada" es el diferenciador central** → NO se difiere.
- Se difiere solo la **tecnología**: en el MVP la verificación del primer grupo se hace
  **manual** (sin guardar DNIs, sin integración, sin carga GDPR pesada).
- La **integración con proveedor IDV** (ver Didit abajo) se mete en v2, cuando lo manual
  no escale.

---

## 🟡 En discusión / dirección probable (no cerrado)

### Modelo de monetización (v2)
- Idea principal: **listarse gratis (sin verificar) + pagar por verificarse** (estilo
  Meta Verified: el check sigue siendo real, se cobra el servicio).
- Posible promo de arranque: **verificación gratis el primer año** (o gratis para el
  primer grupo) para que el badge nazca con credibilidad.
- Suscripción profesional con escalera de valor (ordenada por lo que más valoran):
  1. **Visibilidad** (destacar en directorio, aparecer arriba) — la palanca #1
  2. **Perfil enriquecido** (más fotos, vídeo, bio larga, enlaces)
  3. **Estadísticas** (visitas, contactos, búsquedas en que aparece)
- ⚠️ **La confianza/seguridad NO se vende** — verificación y trust quedan gratis para
  todas. Se cobra visibilidad y herramientas.

### Monetización SIN ser intermediaria (principio clave)
**Regla:** se monetiza el **software y la visibilidad, NO la transacción.** HandyFEM le
vende un producto de marketing/herramientas a las profesionales; nunca toca el dinero del
trabajo ni media entre las partes. Así se evita la responsabilidad legal sobre los trabajos,
la gestión de pagos y las disputas.

Modelos que NO convierten a HandyFEM en intermediaria (ordenados por encaje):

| Modelo | Cómo funciona | Encaje |
|---|---|---|
| **Suscripción profesional** | Cuota recurrente por listado premium + herramientas (visibilidad, fotos, stats) | ⭐ El mejor — recurrente y limpio |
| **Listados destacados** | Pagan por aparecer arriba/resaltadas | ⭐ Encaja dentro de la suscripción |
| **Verificación de pago** | Cobras el servicio de verificar (estilo Meta) | ✅ Posible, con cuidado de marca |
| **Partnerships / afiliación** | Comisión por recomendar seguros, herramientas, formación para mujeres en oficios | ✅ Secundario y on-brand |
| **Pago por lead/contacto** | Pagan por contacto recibido o "créditos" para responder | 🟡 Modelo Thumbtack/Bark; genera fricción si el lead no convierte |

**A evitar:**
- ❌ **Comisión por trabajo** → obliga a meter la transacción en la app = ser intermediaria
  + responsabilidad legal. Es justo lo que NO se quiere.
- ❌ **Paywall a la seguridad** → la verificación/confianza, gratis para todas.

En una frase: **HandyFEM es una plataforma de visibilidad y confianza para profesionales,
no una agencia que coloca trabajos. Vende el escaparate, no el servicio.**

### Sistema de insignias (v2)
Tres tipos, con reglas distintas:
- **A. Verificación** (la plataforma comprueba un hecho): Identidad (DNI), Oficio/titulación.
  → Pueden ir detrás de un pago (cobras el servicio de verificar).
- **B. Reputación** (se gana con comportamiento): basadas en reseñas, antigüedad, etc.
  → **NUNCA se compran**, solo se ganan. Si se vendieran, no valdrían nada.
- **C. Estado/promo:** "Pionera" (primeras profesionales), etc. Gratis, marketing.
- Reglas: cada insignia dice **exactamente** qué certifica ("identidad", no "segura");
  pocas y claras (la card debe dar confianza en 3 segundos); las de reseñas necesitan
  **reseñas verificadas** (solo tras contacto/servicio real) y antifraude.
- **MVP: 1-2 insignias máximo** (Identidad verificada, quizá Oficio). El sistema completo es v2.

### Medición de "trabajos cerrados" (problema abierto)
- Con el modelo "contacto directo", la plataforma **no sabe** si un trabajo se cerró
  (ocurre fuera de la app). No se puede premiar por "trabajos cerrados" sin medirlos.
- Solución propuesta (encaja sin meter transacciones):
  - **Reseñas** como proxy de trabajo realizado.
  - **Confirmación ligera "trabajo realizado"** por ambas partes → habilita reseña y
    suma a estadísticas. Difícil de falsear (requiere a las dos).
- Gamificación/premios: solo atados a señales difíciles de falsear; es v2.

---

## 🔴 Pendiente de investigar / decidir
- **Verificación de IDENTIDAD (proveedor IDV para v2):** candidato **Didit** — tier
  gratis 500 verificaciones/mes, luego ~0,33 $ KYC completo. Confirmar **residencia de
  datos en la UE + DPA** antes de comprometerse (requisito GDPR).
- **Verificación de OFICIO/titulación:** cómo se comprueba (certificados, alta de
  autónoma, referencias). Sin definir.
- **Proceso de verificación detallado:** qué ve la profesional, qué se guarda, cómo se
  concede el badge. El spec lo tiene "en construcción".
- **Reconciliar copy "contacto directo, sin intermediarios" vs privacidad** (no exponer
  teléfono/email reales; usar chat interno). Ajustar mensaje para no confundir.
