import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { products } from '../data/products';

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const isRTL = i18n.language === 'ar';

  // Initial message based on language
  useEffect(() => {
    const welcomeMsg = {
      en: '👋 Hello! Welcome to Flavor House! I\'m here to help you. Ask me about our menu, prices, or recommendations!',
      fr: '👋 Bonjour ! Bienvenue chez Flavor House ! Je suis là pour vous aider. Demandez-moi tout sur notre menu, nos prix ou nos recommandations !',
      ar: '👋 مرحباً! مرحباً بك في فلافور هاوس! أنا هنا لمساعدتك. اسألني عن قائمتنا، الأسعار، أو التوصيات!'
    };
    setMessages([
      { id: 1, sender: 'bot', text: welcomeMsg[i18n.language] || welcomeMsg.en }
    ]);
  }, [i18n.language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findProductsByKeyword = (keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerKeyword) ||
      p.category.toLowerCase().includes(lowerKeyword) ||
      p.description.toLowerCase().includes(lowerKeyword) ||
      p.ingredients.toLowerCase().includes(lowerKeyword)
    );
  };

  // Fonction pour répondre avec les 3 langues
  const getBotResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    const lang = i18n.language;
    const t = (key) => i18n.t(key);

    // ----- SALUTATIONS (3 langues) -----
    const greetings = {
      en: ['hello', 'hi', 'hey', 'salut', 'bonjour'],
      fr: ['bonjour', 'salut', 'coucou', 'hello', 'hi'],
      ar: ['مرحبا', 'السلام', 'اهلا', 'هلا', 'سلام']
    };
    const allGreetings = [...greetings.en, ...greetings.fr, ...greetings.ar];
    if (allGreetings.some(g => lowerMsg.includes(g))) {
      return {
        en: '👋 Hello! Welcome to Flavor House! How can I help you today?',
        fr: '👋 Bonjour ! Bienvenue chez Flavor House ! Comment puis-je vous aider aujourd\'hui ?',
        ar: '👋 مرحباً! أهلاً بك في فلافور هاوس! كيف يمكنني مساعدتك اليوم؟'
      }[lang];
    }

    // ----- RECOMMANDATIONS BUDGET -----
    if (lowerMsg.includes('1000') || lowerMsg.includes('1000 da') || lowerMsg.includes('1000da')) {
      return {
        en: '💰 With 1000 DA, you can buy:\n- Cheeseburger: 850 DA (Left: 150 DA for a drink!)\n- Chicken Burger: 800 DA (Left: 200 DA for a drink!)\n- Pizza Sauce Tomate: 1100 DA (Just 100 DA more!)\n- Mixed Tacos: 850 DA\n🍽️ What do you prefer?',
        fr: '💰 Avec 1000 DA, vous pouvez acheter :\n- Cheeseburger : 850 DA (Reste 150 DA pour une boisson !)\n- Chicken Burger : 800 DA (Reste 200 DA pour une boisson !)\n- Pizza Sauce Tomate : 1100 DA (Juste 100 DA de plus !)\n- Mixed Tacos : 850 DA\n🍽️ Que préférez-vous ?',
        ar: '💰 مع 1000 دج، يمكنك شراء:\n- تشيز برجر: 850 دج (يبقى 150 دج لمشروب!)\n- برجر دجاج: 800 دج (يبقى 200 دج لمشروب!)\n- بيتزا صلصة الطماطم: 1100 دج (فقط 100 دج إضافية!)\n- تاكوس مشكل: 850 دج\n🍽️ ماذا تفضل؟'
      }[lang];
    }

    // ----- PIZZA -----
    if (lowerMsg.includes('pizza') || lowerMsg.includes('بيتزا') || lowerMsg.includes('pizz')) {
      if (lowerMsg.includes('price') || lowerMsg.includes('prix') || lowerMsg.includes('سعر') || lowerMsg.includes('combien')) {
        return {
          en: '🍕 Pizza Prices:\n- Pizza Blanche: 1200 DA ⭐ 4.8\n- Pizza 4 Fromages: 1400 DA ⭐ 4.9\n- Pizza Viande: 1300 DA ⭐ 4.7\n- Pizza Poulet: 1200 DA ⭐ 4.6\n- Pizza Mixte: 1500 DA ⭐ 4.9\n- Pizza Sauce Tomate: 1100 DA ⭐ 4.5',
          fr: '🍕 Prix des pizzas :\n- Pizza Blanche : 1200 DA ⭐ 4.8\n- Pizza 4 Fromages : 1400 DA ⭐ 4.9\n- Pizza Viande : 1300 DA ⭐ 4.7\n- Pizza Poulet : 1200 DA ⭐ 4.6\n- Pizza Mixte : 1500 DA ⭐ 4.9\n- Pizza Sauce Tomate : 1100 DA ⭐ 4.5',
          ar: '🍕 أسعار البيتزا:\n- بيتزا بلانش: 1200 دج ⭐ 4.8\n- بيتزا 4 أجبان: 1400 دج ⭐ 4.9\n- بيتزا باللحم: 1300 دج ⭐ 4.7\n- بيتزا بالدجاج: 1200 دج ⭐ 4.6\n- بيتزا مشكلة: 1500 دج ⭐ 4.9\n- بيتزا صلصة الطماطم: 1100 دج ⭐ 4.5'
        }[lang];
      }
      return {
        en: '🍕 We have 6 delicious pizzas! Check our menu for details.',
        fr: '🍕 Nous avons 6 pizzas délicieuses ! Consultez notre menu pour plus de détails.',
        ar: '🍕 لدينا 6 بيتزات لذيذة! تحقق من قائمتنا للتفاصيل.'
      }[lang];
    }

    // ----- BURGER -----
    if (lowerMsg.includes('burger') || lowerMsg.includes('برجر') || lowerMsg.includes('burgers')) {
      return {
        en: '🍔 We have 4 delicious burgers!\n- Cheeseburger: 850 DA ⭐ 4.9\n- Double Burger: 1050 DA ⭐ 4.8\n- Chicken Burger: 800 DA ⭐ 4.8\n- Spicy Burger: 880 DA ⭐ 4.6',
        fr: '🍔 Nous avons 4 burgers délicieux !\n- Cheeseburger : 850 DA ⭐ 4.9\n- Double Burger : 1050 DA ⭐ 4.8\n- Chicken Burger : 800 DA ⭐ 4.8\n- Spicy Burger : 880 DA ⭐ 4.6',
        ar: '🍔 لدينا 4 برجر لذيذ!\n- تشيز برجر: 850 دج ⭐ 4.9\n- دبل برجر: 1050 دج ⭐ 4.8\n- برجر دجاج: 800 دج ⭐ 4.8\n- برجر حار: 880 دج ⭐ 4.6'
      }[lang];
    }

    // ----- TACOS -----
    if (lowerMsg.includes('tacos') || lowerMsg.includes('تاكوس') || lowerMsg.includes('taco')) {
      return {
        en: '🌮 Tacos Menu:\n- Chicken Tacos: 750 DA ⭐ 4.7\n- Meat Tacos: 800 DA ⭐ 4.6\n- Mixed Tacos: 850 DA ⭐ 4.8',
        fr: '🌮 Menu Tacos :\n- Chicken Tacos : 750 DA ⭐ 4.7\n- Meat Tacos : 800 DA ⭐ 4.6\n- Mixed Tacos : 850 DA ⭐ 4.8',
        ar: '🌮 قائمة التاكوس:\n- تاكوس دجاج: 750 دج ⭐ 4.7\n- تاكوس لحم: 800 دج ⭐ 4.6\n- تاكوس مشكل: 850 دج ⭐ 4.8'
      }[lang];
    }

    // ----- SANDWICH -----
    if (lowerMsg.includes('sandwich') || lowerMsg.includes('ساندويتش') || lowerMsg.includes('sandwiches')) {
      return {
        en: '🥪 Sandwich Menu:\n- Special Sandwich: 650 DA ⭐ 4.8\n- Chicken Sandwich: 550 DA ⭐ 4.5\n- Meat Sandwich: 600 DA ⭐ 4.6\n- Liver Sandwich (Kabda): 500 DA ⭐ 4.4\n- Escalope Sandwich: 600 DA ⭐ 4.7',
        fr: '🥪 Menu Sandwich :\n- Special Sandwich : 650 DA ⭐ 4.8\n- Chicken Sandwich : 550 DA ⭐ 4.5\n- Meat Sandwich : 600 DA ⭐ 4.6\n- Liver Sandwich (Kabda) : 500 DA ⭐ 4.4\n- Escalope Sandwich : 600 DA ⭐ 4.7',
        ar: '🥪 قائمة الساندويتشات:\n- ساندويتش خاص: 650 دج ⭐ 4.8\n- ساندويتش دجاج: 550 دج ⭐ 4.5\n- ساندويتش لحم: 600 دج ⭐ 4.6\n- ساندويتش كبدة: 500 دج ⭐ 4.4\n- ساندويتش اسكالوب: 600 دج ⭐ 4.7'
      }[lang];
    }

    // ----- PASTA -----
    if (lowerMsg.includes('pasta') || lowerMsg.includes('باستا') || lowerMsg.includes('spaghetti')) {
      return {
        en: '🍝 Pasta Menu:\n- Alfredo Pasta: 950 DA ⭐ 4.8 (Creamy with chicken)\n- Carbonara Pasta: 900 DA ⭐ 4.7 (Classic carbonara)',
        fr: '🍝 Menu Pâtes :\n- Alfredo Pasta : 950 DA ⭐ 4.8 (Crémeuse au poulet)\n- Carbonara Pasta : 900 DA ⭐ 4.7 (Carbonara classique)',
        ar: '🍝 قائمة الباستا:\n- باستا ألفريدو: 950 دج ⭐ 4.8 (كريمية بالدجاج)\n- باستا كاربونارا: 900 دج ⭐ 4.7 (كاربونارا كلاسيكية)'
      }[lang];
    }

    // ----- MEALS -----
    if (lowerMsg.includes('meal') || lowerMsg.includes('grill') || lowerMsg.includes('steak') || lowerMsg.includes('cordon') || lowerMsg.includes('وجبة') || lowerMsg.includes('مشاوي')) {
      return {
        en: '🍗 Meals Menu:\n- Grilled Chicken: 1100 DA ⭐ 4.7\n- Steak with Fries: 1300 DA ⭐ 4.9\n- Mixed Grill: 1500 DA ⭐ 4.9\n- Cordon Bleu: 1200 DA ⭐ 4.8\n- Escalope Plate: 1150 DA ⭐ 4.6',
        fr: '🍗 Menu Plats :\n- Grilled Chicken : 1100 DA ⭐ 4.7\n- Steak with Fries : 1300 DA ⭐ 4.9\n- Mixed Grill : 1500 DA ⭐ 4.9\n- Cordon Bleu : 1200 DA ⭐ 4.8\n- Escalope Plate : 1150 DA ⭐ 4.6',
        ar: '🍗 قائمة الوجبات:\n- دجاج مشوي: 1100 دج ⭐ 4.7\n- ستيك مع البطاطس: 1300 دج ⭐ 4.9\n- مشاوي مشكلة: 1500 دج ⭐ 4.9\n- كوردون بلو: 1200 دج ⭐ 4.8\n- طبق اسكالوب: 1150 دج ⭐ 4.6'
      }[lang];
    }

    // ----- SALADS -----
    if (lowerMsg.includes('salad') || lowerMsg.includes('سلطة') || lowerMsg.includes('salads')) {
      return {
        en: '🥗 Salads Menu:\n- Caesar Salad: 550 DA ⭐ 4.5\n- Green Salad: 400 DA ⭐ 4.3\n- Mixed Salad: 480 DA ⭐ 4.4\n- Tuna Salad: 600 DA ⭐ 4.6',
        fr: '🥗 Menu Salades :\n- Caesar Salad : 550 DA ⭐ 4.5\n- Green Salad : 400 DA ⭐ 4.3\n- Mixed Salad : 480 DA ⭐ 4.4\n- Tuna Salad : 600 DA ⭐ 4.6',
        ar: '🥗 قائمة السلطات:\n- سلطة سيزر: 550 دج ⭐ 4.5\n- سلطة خضراء: 400 دج ⭐ 4.3\n- سلطة مشكلة: 480 دج ⭐ 4.4\n- سلطة تونة: 600 دج ⭐ 4.6'
      }[lang];
    }

    // ----- DRINKS -----
    if (lowerMsg.includes('drink') || lowerMsg.includes('drinks') || lowerMsg.includes('soda') || lowerMsg.includes('cola') || lowerMsg.includes('juice') || lowerMsg.includes('water') || lowerMsg.includes('مشروب') || lowerMsg.includes('ماء') || lowerMsg.includes('عصير')) {
      return {
        en: '🥤 Drinks Menu:\n- Coca Cola: 200 DA\n- Fanta: 200 DA\n- Sprite: 200 DA\n- Hamoud: 200 DA\n- Water: 100 DA\n- Orange Juice: 250 DA\n- Milkshake: 350 DA',
        fr: '🥤 Menu Boissons :\n- Coca Cola : 200 DA\n- Fanta : 200 DA\n- Sprite : 200 DA\n- Hamoud : 200 DA\n- Eau : 100 DA\n- Jus d\'orange : 250 DA\n- Milkshake : 350 DA',
        ar: '🥤 قائمة المشروبات:\n- كوكا كولا: 200 دج\n- فانتا: 200 دج\n- سبرايت: 200 دج\n- حمود: 200 دج\n- ماء: 100 دج\n- عصير برتقال: 250 دج\n- ميلك شيك: 350 دج'
      }[lang];
    }

    // ----- DESSERTS -----
    if (lowerMsg.includes('dessert') || lowerMsg.includes('desserts') || lowerMsg.includes('cake') || lowerMsg.includes('ice cream') || lowerMsg.includes('chocolate') || lowerMsg.includes('حلويات') || lowerMsg.includes('كيك') || lowerMsg.includes('آيس كريم')) {
      return {
        en: '🍰 Desserts Menu:\n- Tiramisu: 450 DA ⭐ 4.9\n- Cheesecake: 500 DA ⭐ 4.8\n- Brownie: 400 DA ⭐ 4.7\n- Chocolate Fondant: 480 DA ⭐ 4.9\n- Crepe Nutella: 350 DA ⭐ 4.7\n- Waffle: 380 DA ⭐ 4.6\n- Ice Cream: 300 DA ⭐ 4.5\n- Fruit Salad: 350 DA ⭐ 4.4',
        fr: '🍰 Menu Desserts :\n- Tiramisu : 450 DA ⭐ 4.9\n- Cheesecake : 500 DA ⭐ 4.8\n- Brownie : 400 DA ⭐ 4.7\n- Chocolate Fondant : 480 DA ⭐ 4.9\n- Crepe Nutella : 350 DA ⭐ 4.7\n- Waffle : 380 DA ⭐ 4.6\n- Ice Cream : 300 DA ⭐ 4.5\n- Fruit Salad : 350 DA ⭐ 4.4',
        ar: '🍰 قائمة الحلويات:\n- تيراميسو: 450 دج ⭐ 4.9\n- تشيز كيك: 500 دج ⭐ 4.8\n- براوني: 400 دج ⭐ 4.7\n- فوندان الشوكولاتة: 480 دج ⭐ 4.9\n- كريب نوتيلا: 350 دج ⭐ 4.7\n- وافل: 380 دج ⭐ 4.6\n- آيس كريم: 300 دج ⭐ 4.5\n- سلطة فواكه: 350 دج ⭐ 4.4'
      }[lang];
    }

    // ----- PROMOTIONS -----
    if (lowerMsg.includes('promotion') || lowerMsg.includes('promo') || lowerMsg.includes('offer') || lowerMsg.includes('offre') || lowerMsg.includes('discount') || lowerMsg.includes('reduction') || lowerMsg.includes('عرض') || lowerMsg.includes('خصم')) {
      return {
        en: '🎁 Current Promotions:\n- 20% OFF Burgers (Code: BURGER20)\n- Buy 2 Pizzas Get 1 Free (Code: FAMILY3)\n- Free Drink with orders over 1000 DA (Code: FREEDRINK)\n- Student Discount 15% (Code: STUDENT15)\n- Weekend Special 25% OFF Meals (Code: WEEKEND25)',
        fr: '🎁 Promotions en cours :\n- 20% sur les Burgers (Code : BURGER20)\n- Achetez 2 Pizzas et obtenez 1 Gratuite (Code : FAMILY3)\n- Boisson Gratuite pour les commandes de plus de 1000 DA (Code : FREEDRINK)\n- Réduction Étudiant 15% (Code : STUDENT15)\n- Spécial Week-end 25% sur les Plats (Code : WEEKEND25)',
        ar: '🎁 العروض الحالية:\n- خصم 20% على البرجر (الكود: BURGER20)\n- اشتر 2 بيتزا واحصل على 1 مجاناً (الكود: FAMILY3)\n- مشروب مجاني مع الطلبات فوق 1000 دج (الكود: FREEDRINK)\n- خصم الطلاب 15% (الكود: STUDENT15)\n- عطلة نهاية الأسبوع 25% على الوجبات (الكود: WEEKEND25)'
      }[lang];
    }

    // ----- DELIVERY -----
    if (lowerMsg.includes('delivery') || lowerMsg.includes('livraison') || lowerMsg.includes('deliver') || lowerMsg.includes('shipping') || lowerMsg.includes('توصيل')) {
      return {
        en: '🛵 Delivery Info:\n- Delivery fee: 200 DA\n- Free delivery for orders over 2000 DA\n- Estimated time: 30-45 minutes\n- We deliver to all Algiers\n- Cash on delivery available',
        fr: '🛵 Infos Livraison :\n- Frais de livraison : 200 DA\n- Livraison gratuite pour les commandes de plus de 2000 DA\n- Temps estimé : 30-45 minutes\n- Nous livrons dans tout Alger\n- Paiement à la livraison disponible',
        ar: '🛵 معلومات التوصيل:\n- رسوم التوصيل: 200 دج\n- توصيل مجاني للطلبات فوق 2000 دج\n- الوقت المقدر: 30-45 دقيقة\n- نوصل في جميع أنحاء الجزائر\n- الدفع عند الاستلام متاح'
      }[lang];
    }

    // ----- OPENING HOURS -----
    if (lowerMsg.includes('open') || lowerMsg.includes('hour') || lowerMsg.includes('time') || lowerMsg.includes('fermé') || lowerMsg.includes('horaire') || lowerMsg.includes('heure') || lowerMsg.includes('schedule') || lowerMsg.includes('ساعة') || lowerMsg.includes('وقت') || lowerMsg.includes('مفتوح')) {
      return {
        en: '🕐 Opening Hours:\n- Monday - Sunday: 10:00 AM - 11:00 PM\n- Delivery available during opening hours\n- We are open every day! 🎉',
        fr: '🕐 Horaires d\'ouverture :\n- Lundi - Dimanche : 10h00 - 23h00\n- Livraison disponible pendant les heures d\'ouverture\n- Nous sommes ouverts tous les jours ! 🎉',
        ar: '🕐 ساعات العمل:\n- الاثنين - الأحد: 10:00 صباحاً - 11:00 مساءً\n- التوصيل متاح خلال ساعات العمل\n- نحن مفتوحون كل يوم! 🎉'
      }[lang];
    }

    // ----- CONTACT -----
    if (lowerMsg.includes('contact') || lowerMsg.includes('call') || lowerMsg.includes('phone') || lowerMsg.includes('email') || lowerMsg.includes('adresse') || lowerMsg.includes('address') || lowerMsg.includes('اتصل') || lowerMsg.includes('هاتف') || lowerMsg.includes('بريد')) {
      return {
        en: '📞 Contact Us:\n- Phone: +213 555 123 456\n- WhatsApp: +213 555 123 456\n- Email: contact@flavorhouse.dz\n- Address: 123 Rue Didouche Mourad, Algiers\n- Open: 10:00 - 23:00',
        fr: '📞 Contactez-nous :\n- Téléphone : +213 555 123 456\n- WhatsApp : +213 555 123 456\n- E-mail : contact@flavorhouse.dz\n- Adresse : 123 Rue Didouche Mourad, Alger\n- Ouvert : 10h00 - 23h00',
        ar: '📞 اتصل بنا:\n- الهاتف: +213 555 123 456\n- واتساب: +213 555 123 456\n- البريد الإلكتروني: contact@flavorhouse.dz\n- العنوان: 123 شارع ديدوش مراد، الجزائر\n- مفتوح: 10:00 - 23:00'
      }[lang];
    }

    // ----- SPICY -----
    if (lowerMsg.includes('spicy') || lowerMsg.includes('piquant') || lowerMsg.includes('hot') || lowerMsg.includes('حار')) {
      return {
        en: '🌶️ Spicy Menu:\n- Spicy Burger: 880 DA (With jalapenos!)\n- Mixed Tacos: 850 DA (Spicy sauce)\n- Pizza Viande: 1300 DA (With spicy beef)',
        fr: '🌶️ Menu Épicé :\n- Spicy Burger : 880 DA (Avec jalapenos !)\n- Mixed Tacos : 850 DA (Sauce épicée)\n- Pizza Viande : 1300 DA (Avec bœuf épicé)',
        ar: '🌶️ القائمة الحارة:\n- برجر حار: 880 دج (مع الفلفل الحار!)\n- تاكوس مشكل: 850 دج (صلصة حارة)\n- بيتزا باللحم: 1300 دج (مع لحم حار)'
      }[lang];
    }

    // ----- VEGETARIAN -----
    if (lowerMsg.includes('vegetarian') || lowerMsg.includes('vege') || lowerMsg.includes('sans viande') || lowerMsg.includes('نباتي')) {
      return {
        en: '🌿 Vegetarian Options:\n- Pizza Sauce Tomate: 1100 DA\n- Green Salad: 400 DA\n- Mixed Salad: 480 DA\n- Cheese Pizza: (ask for customization)\n🥗 We have many options for you!',
        fr: '🌿 Options Végétariennes :\n- Pizza Sauce Tomate : 1100 DA\n- Green Salad : 400 DA\n- Mixed Salad : 480 DA\n- Pizza Fromage : (demandez une personnalisation)\n🥗 Nous avons de nombreuses options pour vous !',
        ar: '🌿 خيارات نباتية:\n- بيتزا صلصة الطماطم: 1100 دج\n- سلطة خضراء: 400 دج\n- سلطة مشكلة: 480 دج\n- بيتزا جبن: (اطلب التخصيص)\n🥗 لدينا العديد من الخيارات لك!'
      }[lang];
    }

    // ----- RECOMMANDATIONS GÉNÉRALES -----
    if (lowerMsg.includes('recommend') || lowerMsg.includes('suggest') || lowerMsg.includes('advice') || lowerMsg.includes('what should') || lowerMsg.includes('توصية') || lowerMsg.includes('ماذا تقدم') || lowerMsg.includes('اقتراح')) {
      const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3);
      return {
        en: `🍽️ Here are some suggestions:\n${randomProducts.map(p => `- ${p.name}: ${p.price || p.basePrice} DA ⭐ ${p.rating}`).join('\n')}\nTell me if you like any!`,
        fr: `🍽️ Voici quelques suggestions :\n${randomProducts.map(p => `- ${p.name}: ${p.price || p.basePrice} DA ⭐ ${p.rating}`).join('\n')}\nDites-moi si vous en aimez un !`,
        ar: `🍽️ إليك بعض الاقتراحات:\n${randomProducts.map(p => `- ${p.name}: ${p.price || p.basePrice} دج ⭐ ${p.rating}`).join('\n')}\nأخبرني إذا أعجبك أي منها!`
      }[lang];
    }

    // ----- MENU COMPLET -----
    if (lowerMsg.includes('menu') && (lowerMsg.includes('all') || lowerMsg.includes('complete') || lowerMsg.includes('full') || lowerMsg.includes('كل') || lowerMsg.includes('كامل'))) {
      return {
        en: '📋 Complete Menu:\n🍕 Pizza (6 items)\n🍔 Burger (4 items)\n🌮 Tacos (3 items)\n🥪 Sandwich (5 items)\n🍝 Pasta (2 items)\n🍗 Meals (5 items)\n🥗 Salads (4 items)\n🥤 Drinks (7 items)\n🍰 Desserts (8 items)\nTotal: 44 items! Check our menu page for details.',
        fr: '📋 Menu Complet :\n🍕 Pizza (6 articles)\n🍔 Burger (4 articles)\n🌮 Tacos (3 articles)\n🥪 Sandwich (5 articles)\n🍝 Pâtes (2 articles)\n🍗 Plats (5 articles)\n🥗 Salades (4 articles)\n🥤 Boissons (7 articles)\n🍰 Desserts (8 articles)\nTotal : 44 articles ! Consultez notre page menu pour plus de détails.',
        ar: '📋 القائمة الكاملة:\n🍕 بيتزا (6 عناصر)\n🍔 برجر (4 عناصر)\n🌮 تاكوس (3 عناصر)\n🥪 ساندويتش (5 عناصر)\n🍝 باستا (2 عناصر)\n🍗 وجبات (5 عناصر)\n🥗 سلطات (4 عناصر)\n🥤 مشروبات (7 عناصر)\n🍰 حلويات (8 عناصر)\nالمجموع: 44 عنصر! تحقق من صفحة القائمة للتفاصيل.'
      }[lang];
    }

    // ----- MERCI / AU REVOIR -----
    if (lowerMsg.includes('thank') || lowerMsg.includes('merci') || lowerMsg.includes('thanks') || lowerMsg.includes('bye') || lowerMsg.includes('au revoir') || lowerMsg.includes('شكرا') || lowerMsg.includes('مع السلامة')) {
      return {
        en: '😊 You\'re welcome! Come back anytime. If you need help, just ask! Bon appétit! 🍽️',
        fr: '😊 De rien ! Revenez quand vous voulez. Si vous avez besoin d\'aide, n\'hésitez pas à demander ! Bon appétit ! 🍽️',
        ar: '😊 عفواً! عد في أي وقت. إذا كنت بحاجة إلى مساعدة، فقط اسأل! بالهناء والشفاء! 🍽️'
      }[lang];
    }

    // ----- RECHERCHE DE PRODUITS -----
    const foundProducts = findProductsByKeyword(userMessage);
    if (foundProducts.length > 0) {
      const p = foundProducts[0];
      return {
        en: `🍽️ I found "${p.name}"!\n📝 ${p.description}\n💰 Price: ${p.price || p.basePrice} DA\n⏱️ Time: ${p.time}\n⭐ Rating: ${p.rating}\n🧂 Ingredients: ${p.ingredients}\nDo you want to add it to your cart?`,
        fr: `🍽️ J'ai trouvé "${p.name}" !\n📝 ${p.description}\n💰 Prix : ${p.price || p.basePrice} DA\n⏱️ Temps : ${p.time}\n⭐ Note : ${p.rating}\n🧂 Ingrédients : ${p.ingredients}\nVoulez-vous l'ajouter à votre panier ?`,
        ar: `🍽️ وجدت "${p.name}"!\n📝 ${p.description}\n💰 السعر: ${p.price || p.basePrice} دج\n⏱️ الوقت: ${p.time}\n⭐ التقييم: ${p.rating}\n🧂 المكونات: ${p.ingredients}\nهل تريد إضافته إلى سلة التسوق؟`
      }[lang];
    }

    // ----- RÉPONSE PAR DÉFAUT -----
    return {
      en: "🤔 I'm not sure I understand. Here's what I can help with:\n- Recommendations (e.g., 'recommend burger')\n- Prices (e.g., 'price pizza')\n- Menu info (e.g., 'pizza menu')\n- Promotions\n- Delivery info\n- Opening hours\n- Budget help (e.g., 'I have 1000 DA')",
      fr: "🤔 Je ne suis pas sûr de comprendre. Voici ce que je peux vous aider :\n- Recommandations (ex: 'recommend burger')\n- Prix (ex: 'price pizza')\n- Infos menu (ex: 'pizza menu')\n- Promotions\n- Infos livraison\n- Horaires d'ouverture\n- Aide budget (ex: 'I have 1000 DA')",
      ar: "🤔 لست متأكداً من أنني أفهم. إليك ما يمكنني مساعدتك فيه:\n- توصيات (مثال: 'recommend burger')\n- الأسعار (مثال: 'price pizza')\n- معلومات القائمة (مثال: 'pizza menu')\n- العروض\n- معلومات التوصيل\n- ساعات العمل\n- مساعدة الميزانية (مثال: 'I have 1000 DA')"
    }[lang];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMsg]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} bg-red-800 text-white p-4 rounded-full shadow-2xl hover:bg-red-900 transition z-50`}
      >
        {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 ${isRTL ? 'left-6' : 'right-6'} w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col h-[500px] ${isRTL ? 'rtl' : ''}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-red-800 to-red-900 p-4 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <FaRobot className="text-white text-2xl" />
              <div>
                <h3 className="text-white font-bold">
                  {i18n.language === 'ar' ? 'مساعد فلافور هاوس' : 
                   i18n.language === 'fr' ? 'Assistant Flavor House' : 
                   'Flavor House Assistant'}
                </h3>
                <p className="text-white/70 text-sm">
                  {i18n.language === 'ar' ? 'متصل - جاهز للمساعدة!' : 
                   i18n.language === 'fr' ? 'En ligne - Prêt à aider !' : 
                   'Online - Ready to help!'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className={`flex-1 p-4 overflow-y-auto ${isRTL ? 'rtl' : ''}`}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`mb-3 max-w-[80%] ${
                  msg.sender === 'user' ? (isRTL ? 'mr-auto' : 'ml-auto') : (isRTL ? 'ml-auto' : 'mr-auto')
                }`}
              >
                <div
                  className={`p-3 rounded-xl ${
                    msg.sender === 'user'
                      ? 'bg-red-800 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  } ${isRTL ? 'rounded-br-xl rounded-bl-none' : ''}`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  i18n.language === 'ar' ? 'اسألني أي شيء...' : 
                  i18n.language === 'fr' ? 'Demandez-moi n\'importe quoi...' : 
                  'Ask me anything...'
                }
                className={`flex-1 p-2 border border-gray-300 rounded-lg focus:border-red-800 focus:outline-none ${isRTL ? 'text-right' : ''}`}
              />
              <button
                onClick={handleSend}
                className="bg-red-800 text-white p-2 rounded-lg hover:bg-red-900 transition"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
