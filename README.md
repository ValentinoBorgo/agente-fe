# 🎨 **Agente IA — Frontend (Next.js)**  
Incluye chat con streaming en tiempo real, visualización de reasoning, ejecución de tools y experiencia tipo ChatGPT.

---

## 🏷 **Badges**
![Next.js](https://img.shields.io/badge/Next.js-black)
![React](https://img.shields.io/badge/React-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-✓-3178c6)
![SSE](https://img.shields.io/badge/Streaming-SSE-success)

---

# 📚 **Tabla de Contenidos**
1. ✨ Introducción  
2. 🔥 Características  
3. 🏗 Arquitectura  
4. ⚙️ Instalación  
5. 🚀 Ejecución  
6. 📡 Comunicación SSE  
7. 💬 Flujo del Chat  
8. 🧩 Componentes principales  
9. 🔐 Seguridad  
10. 🛠 Roadmap  
11. 👤 Autor  

---

# ✨ **Introducción**

Este frontend implementa la experiencia visual del **Agente IA**:  
un chat inteligente con:

- Respuestas en **streaming token-by-token**  
- Indicadores de pensamiento del modelo ("thinking...")  
- Ejecución de tools en tiempo real  
- Autenticación conversacional (sin login tradicional)  
- RAG integrado (el sistema lee archivos locales desde el backend)  

---

# 🔥 **Características principales**

### ✔ Streaming SSE token-by-token  
Los mensajes se construyen mientras llegan desde el backend.

### ✔ Reasoning visible  
Cuando el modelo piensa, aparece un indicador **"🧠 pensando..."**.

### ✔ Visualización de Tools  
Cada tool ejecutada aparece con badge:

- 🛠 authenticate_user  
- 📦 insert_log  
- 📚 rag_search  

### ✔ UI reactiva tipo ChatGPT  
Scroll automático, burbujas, animaciones suaves.

### ✔ Arquitectura limpia  
Hooks reutilizables y componentes desacoplados.

### ✔ Preparado para deploy inmediato en Vercel  
Sin dependencias externas.

---

# 🏗 **Arquitectura del Proyecto**

/app
/chat
page.tsx
ChatContainer.tsx
ChatMessage.tsx
MessageBubble.tsx
TypingIndicator.tsx
/hooks
useChatStream.ts
/lib
api.ts
sseClient.ts
/components
ChatInput.tsx
ToolEventBadge.tsx
/styles
globals.css
.env.local.example

---

# ⚙️ Instalación

```bash
npm install
Configurar variables:

🚀 Ejecución del servidor
bash
Copiar código
npm run dev
La app corre en:

📡 Comunicación con el Backend (SSE)
El frontend escucha al backend mediante Server-Sent Events.

Ejemplo del cliente SSE:

ts
const stream = new EventSource(`${API_URL}/chat`);
Los eventos llegan en este formato:

json
{ "type": "token", "token": "Hola" }
{ "type": "thinking", "text": "Analizando..." }
{ "type": "tool_call", "tool": "insert_log" }
{ "type": "tool_result", "result": { "ok": true } }
{ "type": "finish" }
Todos los tipos aceptados:

Tipo	Descripción
token	Token del modelo
thinking	Reasoning visible
tool_call	Modelo llamó una tool
tool_result	Resultado de la tool
finish	Fin del stream

💬 Flujo del Chat
1️⃣ Usuario envía un mensaje
👇

2️⃣ Front hace POST /api/chat
👇

3️⃣ Backend abre SSE
👇

4️⃣ El frontend renderiza tokens en vivo
👇

5️⃣ El reasoning aparece como "pensando..."
👇

6️⃣ Las tools se muestran con badges
👇

7️⃣ Mensaje final renderizado
🧩 Componentes principales
🔹 useChatStream.ts
Hook que gestiona:

Apertura y cierre de streams

Buffer dinámico de tokens

Estado thinking

Tool calls y respuestas

Cancelación segura

🔹 ChatMessage.tsx
Renderiza cada mensaje según tipo:

💬 user

🤖 assistant

🧠 thinking

🛠 tool-call

📦 tool-result

🔹 TypingIndicator.tsx
Tres puntos animados cuando llegan tokens.

🔹 ToolEventBadge.tsx
Muestra:

authenticate_user

insert_log

rag_search

🔐 Seguridad
Este frontend evita riesgos comunes:

Sanitización de texto

No expone ningún secreto (solo el backend usa claves OPENAI)

Manejo seguro de streams colgados

Prevención de doble conexión SSE

Control de origen mediante .env

🛠 Roadmap
🌙 Dark Mode

💾 Historial persistente

🎚 Mejor representación de reasoning paso a paso

📊 Visualizador de Tools (inspector tipo DevTools)

🔊 Sonidos de chat

🎥 Animaciones más fluidas al estilo ChatGPT

👤 Autor
Valentino Borgo
5/12/2025