export const topics = [
    "filosofía estoica",
    "dopamina y motivación",
    "albert camus absurdismo",
    "teoría de la relatividad",
    "historia del renacimiento",
    "neurociencia de los hábitos",
    "economía conductual",
    "física cuántica básica",
    "historia del jazz",
    "evolución y darwin",
    "psicología de carl jung",
    "historia de la democracia ateniense",
    "marco aurelio estoicismo",
    "inteligencia artificial ética",
    "historia del arte moderno",
  ];
  
  export function getTodaysTopic(): string {
    if (typeof window === "undefined") return topics[0];
  
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("cultured_date");
    const savedTopic = localStorage.getItem("cultured_topic");
  
    if (savedDate === today && savedTopic) {
      return savedTopic;
    }
  
    const random = topics[Math.floor(Math.random() * topics.length)];
    localStorage.setItem("cultured_date", today);
    localStorage.setItem("cultured_topic", random);
    return random;
  }