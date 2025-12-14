// تأثير الكتابة المتقدم
class AdvancedTypewriter {
    constructor(element, texts, speed = 50, pause = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.pause = pause;
        this.textIndex = 0;
        this.charIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.isPaused = false;
    }

    start() {
        this.type();
    }

    type() {
        const current = this.textIndex % this.texts.length;
        const fullText = this.texts[current];

        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.currentText = fullText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        this.element.innerHTML = this.currentText + '<span class="cursor">|</span>';

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === fullText.length) {
            typeSpeed = this.pause;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// عداد الأرقام المتحرك
class AnimatedCounter {
    constructor(element) {
        this.element = element;
        this.target = parseInt(element.getAttribute('data-target'));
        this.duration = 2000;
        this.step = Math.ceil(this.target / (this.duration / 16));
        this.current = 0;
    }

    start() {
        const increment = () => {
            this.current += this.step;
            if (this.current > this.target) {
                this.current = this.target;
            }
            
            this.element.textContent = this.current.toLocaleString();
            
            if (this.current < this.target) {
                requestAnimationFrame(increment);
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        increment();
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(this.element);
    }
}

// شريط التقدم المتقدم
class AdvancedScrollProgress {
    constructor() {
        this.progressBar = document.querySelector('.scroll-progress');
        this.init();
    }

    init() {
        let ticking = false;

        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            
            this.progressBar.style.width = `${progress}%`;
            
            // تأثير تلألؤ عند الوصول لنهاية الصفحة
            if (progress > 95) {
                this.progressBar.style.boxShadow = '0 2px 20px rgba(46, 139, 87, 0.6)';
            } else {
                this.progressBar.style.boxShadow = '0 2px 10px rgba(46, 139, 87, 0.3)';
            }
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        });
    }
}

// أشرطة تقدم المهارات مع تأثيرات متقدمة
class AdvancedProgressBars {
    constructor() {
        this.bars = document.querySelectorAll('.skill-progress-bar');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.getAttribute('data-level');
                    this.animateBar(entry.target, level);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        this.bars.forEach(bar => observer.observe(bar));
    }

    animateBar(bar, level) {
        let current = 0;
        const increment = level / 50;
        const duration = 1500;
        const stepTime = duration / (level / increment);

        const animate = () => {
            current += increment;
            if (current > level) {
                current = level;
            }
            
            bar.style.width = `${current}%`;
            
            // تأثير التلألؤ عند اكتمال التحميل
            if (current >= level) {
                bar.style.boxShadow = '0 0 20px rgba(46, 139, 87, 0.6)';
            }
            
            if (current < level) {
                setTimeout(animate, stepTime);
            }
        };

        animate();
    }
}

// تأثيرات التمرير المتقدمة
class AdvancedScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }

    animateElement(element) {
        if (element.classList.contains('fade-in-up')) {
            element.style.animation = 'advancedFadeInUp 0.8s ease-out forwards';
        } else if (element.classList.contains('slide-in-left')) {
            element.style.animation = 'slideInFromLeft 0.8s ease-out forwards';
        } else if (element.classList.contains('slide-in-right')) {
            element.style.animation = 'slideInFromRight 0.8s ease-out forwards';
        }
    }
}

// مولد PDF متقدم
class AdvancedPDFGenerator {
    constructor() {
        this.downloadBtn = document.getElementById('downloadPdf');
        this.init();
    }

    init() {
        this.downloadBtn.addEventListener('click', () => {
            this.generatePDF();
        });
    }

    generatePDF() {
        // تأثير تحميل
        this.showLoadingEffect();
        
        // محاكاة إنشاء PDF (يمكن استبداله بمكتبة jsPDF)
        setTimeout(() => {
            const content = this.generateCVContent();
            this.downloadText(content, 'سيرة_حمزة_عماري_الذاتية.txt');
            this.showNotification('تم تحميل السيرة الذاتية بنجاح!', 'success');
        }, 2000);
    }

    generateCVContent() {
        return `
سيرة حمزة عماري الذاتية
========================

المعلومات الشخصية:
------------------
الاسم: حمزة خالد عبدالله عماري
المسمى: مهندس برمجيات ومتخصص أمن سيبراني
الهاتف: 774464694
البريد: hamza.ammari@example.com

التعليم:
--------
• دبلوم عالي في الأمن السيبراني - معدل 98% (2023-2024)
• دبلوم عالي في هندسة البرمجيات - معدل 90% (2021-2023)

الخبرة العملية:
---------------
• مهندس برمجيات متقدم - شركة التقنية الذكية (2023-الآن)
• محلل أمن سيبراني - مركز الحماية الرقمية (2022-2023)

المهارات التقنية:
----------------
• JavaScript/TypeScript: 95%
• Python: 90%
• React: 96%
• Node.js: 92%
• الأمن السيبراني: 92%

الشهادات:
---------
• CompTIA Security+ (معدل 98%)
• Certified Ethical Hacker (CEH)
• OWASP Top 10 والبرمجة الآمنة

للحصول على النسخة الكاملة والمحدثة، يرجى زيارة:
https://hamza-ammari-portfolio.com
        `;
    }

    downloadText(content, filename) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    showLoadingEffect() {
        const originalText = this.downloadBtn.innerHTML;
        this.downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>جاري التحميل...</span>';
        this.downloadBtn.disabled = true;

        setTimeout(() => {
            this.downloadBtn.innerHTML = originalText;
            this.downloadBtn.disabled = false;
        }, 2000);
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `advanced-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <div class="notification-progress"></div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#2E8B57' : '#EF4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            min-width: 300px;
            overflow: hidden;
        `;

        document.body.appendChild(notification);

        // شريط التقدم للإشعار
        const progressBar = notification.querySelector('.notification-progress');
        progressBar.style.cssText = `
            position: absolute;
            bottom: 0;
            right: 0;
            height: 3px;
            background: rgba(255, 255, 255, 0.8);
            width: 100%;
            animation: progressBar 3s linear forwards;
        `;

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
}

// نموذج الاتصال المتقدم
class AdvancedContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // تأثيرات الحقول
        this.addInputEffects();
    }

    addInputEffects() {
        const inputs = this.form.querySelectorAll('.form-input, .form-textarea');
        
        inputs.forEach(input => {
            // تأثير عند التركيز
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                this.style.transform = 'scale(1.02)';
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
                this.style.transform = 'scale(1)';
            });

            // تأثير الكتابة
            input.addEventListener('input', function() {
                if (this.value) {
                    this.parentElement.classList.add('has-value');
                } else {
                    this.parentElement.classList.remove('has-value');
                }
            });
        });
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // محاكاة إرسال النموذج
        this.showLoadingState();
        
        setTimeout(() => {
            console.log('بيانات النموذج:', data);
            this.showSuccessNotification();
            this.form.reset();
            this.resetFormEffects();
        }, 2000);
    }

    showLoadingState() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>جاري الإرسال...</span>';
        submitBtn.disabled = true;

        // إضافة تأثير تحميل للحقول
        const inputs = this.form.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.style.background = 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)';
            input.style.backgroundSize = '200% 100%';
            input.style.animation = 'shimmer 1.5s infinite';
        });

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            inputs.forEach(input => {
                input.style.background = '';
                input.style.animation = '';
            });
        }, 2000);
    }

    resetFormEffects() {
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('focused', 'has-value');
        });
    }

    showSuccessNotification() {
        const notification = document.createElement('div');
        notification.className = 'advanced-notification success';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>تم الإرسال بنجاح!</strong>
                    <span>شكراً على رسالتك، سأرد عليك في أقرب وقت ممكن.</span>
                </div>
            </div>
            <div class="notification-progress"></div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #2E8B57;
            color: white;
            padding: 1.5rem;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(46, 139, 87, 0.3);
            z-index: 10000;
            animation: slideInRight 0.6s ease-out;
            min-width: 350px;
            overflow: hidden;
            border-left: 4px solid #3CB371;
        `;

        document.body.appendChild(notification);

        const progressBar = notification.querySelector('.notification-progress');
        progressBar.style.cssText = `
            position: absolute;
            bottom: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #3CB371, #20B2AA);
            width: 100%;
            animation: progressBar 4s linear forwards;
        `;

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.6s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 600);
        }, 4000);
    }
}

// نظام الجسور الناعمة
class SmoothNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                this.scrollToSection(targetId);
            });
        });
    }

    scrollToSection(sectionId) {
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // إضافة تأثير نشط للرابط
            this.setActiveLink(sectionId);
        }
    }

    setActiveLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active');
            }
        });
    }
}

// تأثيرات التمرير للهيدر
class HeaderEffects {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollY = window.scrollY;
        this.init();
    }

    init() {
        let ticking = false;

        const updateHeader = () => {
            const scrollY = window.scrollY;

            if (scrollY > 100) {
                this.header.classList.add('scrolled');
                
                // تأثير إخفاء/إظهار الهيدر
                if (scrollY > this.lastScrollY && scrollY > 200) {
                    this.header.style.transform = 'translateY(-100%)';
                } else {
                    this.header.style.transform = 'translateY(0)';
                }
            } else {
                this.header.classList.remove('scrolled');
                this.header.style.transform = 'translateY(0)';
            }

            this.lastScrollY = scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }
}

// تأثيرات البارالاكس
class ParallaxEffects {
    constructor() {
        this.sections = document.querySelectorAll('.hero, .about, .education, .experience');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.sections.forEach(section => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                section.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// تأثيرات Hover المتقدمة
class AdvancedHoverEffects {
    constructor() {
        this.cards = document.querySelectorAll('.about-card, .project-card, .certification-card, .stat-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        });
    }

    handleMouseEnter(e) {
        const card = e.currentTarget;
        
        // تأثير الاهتزاز
        card.style.transform = 'translateY(-10px) scale(1.02)';
        
        // تأثير الضوء
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        card.classList.add('hover-active');
    }

    handleMouseLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(0) scale(1)';
        card.classList.remove('hover-active');
    }
}

// تهيئة جميع الميزات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تأثير الكتابة المتعدد
    const typewriterElement = document.getElementById('typewriter-text');
    const typewriterTexts = [
        'مهندس برمجيات متخصص في تطوير التطبيقات الآمنة',
        'خبير في الأمن السيبراني والبرمجة الآمنة',
        'مطور واجهات مستخدم جذابة وتجارب مستخدم متميزة',
        'محب للتقنية والإبداع في حل المشكلات'
    ];
    
    const typewriter = new AdvancedTypewriter(typewriterElement, typewriterTexts, 60, 2500);
    typewriter.start();

    // عداد الأرقام
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => new AnimatedCounter(counter).start());

    // شريط التقدم
    new AdvancedScrollProgress();

    // أشرطة تقدم المهارات
    new AdvancedProgressBars();

    // تأثيرات التمرير
    new AdvancedScrollAnimations();

    // مولد PDF
    new AdvancedPDFGenerator();

    // نموذج الاتصال
    new AdvancedContactForm();

    // التنقل السلس
    new SmoothNavigation();

    // تأثيرات الهيدر
    new HeaderEffects();

    // تأثيرات البارالاكس
    new ParallaxEffects();

    // تأثيرات Hover
    new AdvancedHoverEffects();

    // إضافة أنيميشن CSS الإضافية
    const style = document.createElement('style');
    style.textContent = `
        @keyframes advancedFadeInUp {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes progressBar {
            from { width: 100%; }
            to { width: 0%; }
        }
        
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        
        .cursor {
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        .hover-active {
            position: relative;
            overflow: hidden;
        }
        
        .hover-active::before {
            content: '';
            position: absolute;
            top: var(--mouse-y, 50%);
            left: var(--mouse-x, 50%);
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(46, 139, 87, 0.1) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }
        
        .hover-active:hover::before {
            width: 300px;
            height: 300px;
        }
        
        .form-group.focused .form-label {
            color: var(--primary);
            transform: translateY(-25px) scale(0.8);
        }
        
        .form-group.has-value .form-label {
            transform: translateY(-25px) scale(0.8);
        }
        
        .nav-link.active {
            color: var(--primary);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    // تأثيرات إضافية للصفحة
    this.addPageEffects();
});

// وظائف مساعدة عامة
function scrollToSection(sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// إضافة تأثيرات الصفحة
function addPageEffects() {
    // تأثير تحميل الصفحة
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // تأثيرات النقر على الأزرار
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // تأثير الموجة
            const wave = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            wave.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                top: ${y}px;
                left: ${x}px;
                animation: wave 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(wave);
            
            setTimeout(() => {
                wave.remove();
            }, 600);
        });
    });

    // إضافة أنيميشن الموجة
    const waveStyle = document.createElement('style');
    waveStyle.textContent = `
        @keyframes wave {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(waveStyle);
}

// تأثيرات إضافية عند التمرير
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.section-title, .about-card, .project-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
            element.style.animationPlayState = 'running';
        }
    });
});

// تأثيرات عند تحميل الصور
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            img.style.opacity = '1';
        }, 200);
    });
});














// إصلاح ظهور الخبرة العملية
function fixExperienceSection() {
    const experienceItems = document.querySelectorAll('.experience .timeline-item');
    experienceItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 300);
    });
}

// استدعاء الدالة عند التمرير
document.addEventListener('DOMContentLoaded', function() {
    fixExperienceSection();
    
    // أو استخدم observer للظهور عند التمرير
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fixExperienceSection();
            }
        });
    }, { threshold: 0.1 });
    
    const experienceSection = document.querySelector('.experience');
    if (experienceSection) {
        observer.observe(experienceSection);
    }
});























// إصلاح ظهور الأقسام
function fixSectionsAppearance() {
    // إصلاح قسم التعليم
    const educationItems = document.querySelectorAll('.education .timeline-item');
    educationItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 300);
    });
    
    // إصلاح قسم الخبرة
    const experienceItems = document.querySelectorAll('.experience .timeline-item');
    experienceItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 300 + 200);
    });
}

// استدعاء الدالة عند التمرير
document.addEventListener('DOMContentLoaded', function() {
    // إصلاح فوري للأقسام
    setTimeout(fixSectionsAppearance, 1000);
    
    // أو استخدم observer للظهور عند التمرير
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('education')) {
                    fixEducationSection();
                }
                if (entry.target.classList.contains('experience')) {
                    fixExperienceSection();
                }
            }
        });
    }, { threshold: 0.1 });
    
    const educationSection = document.querySelector('.education');
    const experienceSection = document.querySelector('.experience');
    
    if (educationSection) observer.observe(educationSection);
    if (experienceSection) observer.observe(experienceSection);
});

// دوال منفصلة لكل قسم
function fixEducationSection() {
    const educationItems = document.querySelectorAll('.education .timeline-item');
    educationItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 400);
    });
}

function fixExperienceSection() {
    const experienceItems = document.querySelectorAll('.experience .timeline-item');
    experienceItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 400);
    });
}















