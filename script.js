
const languageSelect = document.getElementById("language");
const toName = document.getElementById("toName");
const fromName = document.getElementById("fromName");

const generateBtn = document.getElementById("generateBtn");
const shareBtn = document.getElementById("shareBtn");
const copyBtn = document.getElementById("copyBtn");

const receiver = document.getElementById("receiver");
const personalWish = document.getElementById("personalWish");
const sender = document.getElementById("sender");
const greetingTitle = document.getElementById("greetingTitle");
const toast = document.getElementById("toast");

let currentGreeting = "";
let currentLanguage = "en";

const translations = {
  en: {
    generator: "Create Your Personal Greeting",
    language: "SELECT LANGUAGE",
    to: "TO – RECEIVER'S NAME",
    from: "FROM – YOUR NAME",
    toPlaceholder: "Enter receiver's name",
    fromPlaceholder: "Enter your name",
    generate: "✨ Generate My Greeting",
    preview: "YOUR PERSONALIZED GREETING",
    dear: "Dear",
    greeting: "Happy Laxmi Pujan!",
    wish: "May Maa Lakshmi bless your home with happiness, good health, peace and endless prosperity. May every diya bring new hope and every prayer bring success.",
    withLove: "With warm wishes,",
    share: "↗ Share on WhatsApp",
    copy: "Copy Greeting",
    enterBoth: "Please enter both names!",
    generated: "Your greeting is ready! ✨",
    copied: "Greeting copied successfully!",
    copyError: "Unable to copy. Please try again.",
    intro: "May the divine blessings of Maa Lakshmi illuminate your home with happiness, peace, wealth and prosperity.",
    label: "THE FESTIVAL OF PROSPERITY"
  },

  hi: {
    generator: "अपना व्यक्तिगत शुभकामना संदेश बनाएं",
    language: "भाषा चुनें",
    to: "प्रति – प्राप्तकर्ता का नाम",
    from: "की ओर से – आपका नाम",
    toPlaceholder: "प्राप्तकर्ता का नाम लिखें",
    fromPlaceholder: "अपना नाम लिखें",
    generate: "✨ शुभकामना संदेश बनाएं",
    preview: "आपका व्यक्तिगत शुभकामना संदेश",
    dear: "प्रिय",
    greeting: "शुभ लक्ष्मी पूजन!",
    wish: "माँ लक्ष्मी आपके घर में सुख, शांति, स्वास्थ्य और समृद्धि लेकर आएं। हर दीपक आपके जीवन में नई आशा और हर प्रार्थना सफलता लेकर आए।",
    withLove: "सप्रेम शुभकामनाएं,",
    share: "↗ WhatsApp पर शेयर करें",
    copy: "संदेश कॉपी करें",
    enterBoth: "कृपया दोनों नाम लिखें!",
    generated: "आपका शुभकामना संदेश तैयार है! ✨",
    copied: "संदेश सफलतापूर्वक कॉपी हुआ!",
    copyError: "कॉपी नहीं हो सका। दोबारा प्रयास करें।",
    intro: "माँ लक्ष्मी की कृपा से आपका घर सुख, शांति, धन और समृद्धि से जगमगाता रहे।",
    label: "समृद्धि का पावन पर्व"
  },

  mr: {
    generator: "तुमच्या खास शुभेच्छा तयार करा",
    language: "भाषा निवडा",
    to: "प्रति – शुभेच्छा स्वीकारणाऱ्याचे नाव",
    from: "कडून – तुमचे नाव",
    toPlaceholder: "समोरच्या व्यक्तीचे नाव लिहा",
    fromPlaceholder: "तुमचे नाव लिहा",
    generate: "✨ माझ्या शुभेच्छा तयार करा",
    preview: "तुमच्या खास शुभेच्छा",
    dear: "प्रिय",
    greeting: "शुभ लक्ष्मी पूजन!",
    wish: "महालक्ष्मीच्या कृपेने तुमच्या घरात सुख, शांती, उत्तम आरोग्य आणि समृद्धी नांदो. प्रत्येक दिवा तुमच्या जीवनात नवी आशा आणि प्रत्येक प्रार्थना यश घेऊन येवो.",
    withLove: "मनःपूर्वक शुभेच्छा,",
    share: "↗ WhatsApp वर शेअर करा",
    copy: "शुभेच्छा कॉपी करा",
    enterBoth: "कृपया दोन्ही नावे लिहा!",
    generated: "तुमच्या शुभेच्छा तयार आहेत! ✨",
    copied: "शुभेच्छा यशस्वीरित्या कॉपी झाल्या!",
    copyError: "कॉपी करता आले नाही. पुन्हा प्रयत्न करा.",
    intro: "महालक्ष्मीच्या कृपेने तुमचे घर सुख, शांती, धन आणि समृद्धीने उजळून निघो.",
    label: "समृद्धीचा पवित्र सण"
  }
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function updateLanguage() {
  currentLanguage = languageSelect.value;

  const t = translations[currentLanguage];

  document.documentElement.lang = currentLanguage;

  document.getElementById("generatorTitle").textContent = t.generator;
  document.getElementById("languageLabel").textContent = t.language;
  document.getElementById("toLabel").textContent = t.to;
  document.getElementById("fromLabel").textContent = t.from;
  document.getElementById("previewLabel").textContent = t.preview;

  document.getElementById("topLabel").innerHTML =
    `<span></span>${t.label}<span></span>`;

  document.getElementById("intro").textContent = t.intro;

  toName.placeholder = t.toPlaceholder;
  fromName.placeholder = t.fromPlaceholder;

  generateBtn.textContent = t.generate;
  shareBtn.textContent = t.share;
  copyBtn.textContent = t.copy;

  if (currentGreeting) {
    generateGreeting(false);
  } else {
    greetingTitle.textContent = t.greeting;
    personalWish.textContent = t.wish;
    receiver.textContent = `${t.dear} Family & Friends`;
    sender.textContent = `${t.withLove} Webinor`;
  }
}

function generateGreeting(showMessage = true) {
  const to = toName.value.trim();
  const from = fromName.value.trim();

  const t = translations[currentLanguage];

  if (!to || !from) {
    showToast(t.enterBoth);
    return false;
  }

  receiver.textContent = `${t.dear} ${to},`;
  greetingTitle.textContent = t.greeting;
  personalWish.textContent = t.wish;
  sender.textContent = `${t.withLove} ${from}`;

  currentGreeting = `${t.greeting}

${t.dear} ${to},

${t.wish}

${t.withLove} ${from}`;

  if (showMessage) {
    showToast(t.generated);

    document.getElementById("wishCard").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  return true;
}

generateBtn.addEventListener("click", () => {
  generateGreeting();
});

languageSelect.addEventListener("change", updateLanguage);

shareBtn.addEventListener("click", () => {
  if (!currentGreeting) {
    showToast(translations[currentLanguage].enterBoth);
    return;
  }

  const message = encodeURIComponent(currentGreeting);

  window.open(
    `https://wa.me/?text=${message}`,
    "_blank",
    "noopener,noreferrer"
  );
});

copyBtn.addEventListener("click", async () => {
  if (!currentGreeting) {
    showToast(translations[currentLanguage].enterBoth);
    return;
  }

  try {
    await navigator.clipboard.writeText(currentGreeting);
    showToast(translations[currentLanguage].copied);
  } catch {
    showToast(translations[currentLanguage].copyError);
  }
});

// Floating golden particles

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  particles = Array.from({ length: 65 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 2 + 0.5,
    speed: Math.random() * 0.6 + 0.2,
    alpha: Math.random() * 0.7 + 0.2,
    phase: Math.random() * Math.PI * 2
  }));
}

function animateParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach(p => {
    p.y -= p.speed;
    p.phase += 0.015;

    if (p.y < -5) {
      p.y = window.innerHeight + 5;
      p.x = Math.random() * window.innerWidth;
    }

    const alpha =
      p.alpha * (0.65 + Math.sin(p.phase) * 0.35);

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(255,210,125,${alpha})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ffcf78";
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animateParticles();

updateLanguage();


/* WEBINOR GREETING CARD - FIXED DOWNLOAD */

const downloadBtn = document.getElementById("downloadBtn");

async function createGreetingCard() {
  const to = toName.value.trim();
  const from = fromName.value.trim();
  const t = translations[languageSelect.value];

  if (!to || !from) {
    showToast(t.enterBoth);
    return;
  }

  downloadBtn.disabled = true;
  downloadBtn.textContent = "Preparing your card...";

  try {
    await document.fonts.ready;

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;

    const ctx = canvas.getContext("2d");

    // Background
    const bg = ctx.createLinearGradient(0, 0, 1080, 1350);
    bg.addColorStop(0, "#190815");
    bg.addColorStop(0.5, "#511a30");
    bg.addColorStop(1, "#160711");

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1350);

    // Border
    ctx.strokeStyle = "#e9bd69";
    ctx.lineWidth = 3;
    ctx.strokeRect(35, 35, 1010, 1280);

    ctx.strokeStyle = "#e9bd6960";
    ctx.lineWidth = 1;
    ctx.strokeRect(52, 52, 976, 1246);

    // Golden particles
    for (let i = 0; i < 100; i++) {
      ctx.beginPath();
      ctx.arc(
        60 + Math.random() * 960,
        70 + Math.random() * 1200,
        Math.random() * 3 + 1,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "#e9bd6980";
      ctx.fill();
    }

    // Lotus
    ctx.textAlign = "center";
    ctx.shadowColor = "#e9bd69";
    ctx.shadowBlur = 25;
    ctx.fillStyle = "#ffe5a6";
    ctx.font = "110px serif";
    ctx.fillText("❀", 540, 235);

    // Diya
    ctx.font = "100px serif";
    ctx.fillText("🪔", 540, 385);
    ctx.shadowBlur = 0;

    // Festival heading
    ctx.fillStyle = "#ffe5a6";
    ctx.font = "600 44px Cinzel";
    ctx.fillText("THE FESTIVAL OF PROSPERITY", 540, 475);

    // Main greeting
    ctx.fillStyle = "#ffe5a6";
    ctx.font = languageSelect.value === "en"
      ? "600 65px Cinzel"
      : "58px 'Tiro Devanagari Hindi'";

    ctx.fillText(t.greeting, 540, 590);

    // Divider
    ctx.strokeStyle = "#e9bd69";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(300, 645);
    ctx.lineTo(780, 645);
    ctx.stroke();

    // Receiver
    ctx.fillStyle = "#fff0cf";
    ctx.font = "48px 'Tiro Devanagari Hindi'";
    ctx.fillText(`${t.dear} ${to},`, 540, 735);

    // Message
    ctx.fillStyle = "#f9e9d2";
    ctx.font = languageSelect.value === "en"
      ? "34px 'DM Sans'"
      : "36px 'Tiro Devanagari Hindi'";

    const words = t.wish.split(/\s+/);
    let line = "";
    let y = 845;

    for (const word of words) {
      const test = line ? line + " " + word : word;

      if (ctx.measureText(test).width > 820 && line) {
        ctx.fillText(line, 540, y);
        line = word;
        y += 65;
      } else {
        line = test;
      }
    }

    if (line) ctx.fillText(line, 540, y);

    // Sender
    ctx.fillStyle = "#ffe5a6";
    ctx.font = "38px Cinzel";
    ctx.fillText(`${t.withLove} ${from}`, 540, 1080);

    // Elegant personal greeting card footer
ctx.strokeStyle = "#e9bd6970";
ctx.lineWidth = 1;

ctx.beginPath();
ctx.moveTo(350, 1170);
ctx.lineTo(730, 1170);
ctx.stroke();

ctx.fillStyle = "#e9bd69";
ctx.font = "25px Cinzel";
ctx.fillText("✦ शुभम भवतु ✦", 540, 1220);

    // Download PNG
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(result => {
        if (result) resolve(result);
        else reject(new Error("PNG creation failed"));
      }, "image/png");
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `Webinor-Laxmi-Pujan-${to.replace(/[^a-z0-9]/gi, "-")}.png`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 30000);

    showToast("Greeting card downloaded successfully! 🪔");

  } catch (error) {
    console.error("Greeting card error:", error);
    showToast("Download error: " + error.message);
  } finally {
    downloadBtn.disabled = false;
    downloadBtn.textContent = "↓ Download Greeting Card";
  }
}

downloadBtn.addEventListener("click", createGreetingCard);
