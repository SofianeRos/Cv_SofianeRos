
      const initScripts = () => {
        const animatedElements = document.querySelectorAll('[data-animation-name]');
        if (window.IntersectionObserver) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                const anim = entry.target.getAttribute('data-animation-name');
                if (anim && anim !== 'none') {
                  entry.target.classList.add('animate-' + anim);
                }
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.1 });
          animatedElements.forEach(el => observer.observe(el));
        } else {
          animatedElements.forEach(el => el.classList.add('is-visible'));
        }

        // Animation des barres de progression (Stack)
        const stackObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
            setTimeout(() => {
              const bars = entry.target.querySelectorAll('.skill-bar-fg');
              bars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-target-width') || '0%';
              });
            }, 100);
              stackObserver.unobserve(entry.target);
            }
          });
      }, { threshold: 0 });
        document.querySelectorAll('.stack-block').forEach(el => stackObserver.observe(el));

        // Effet machine à écrire (Terminal)
        document.querySelectorAll('.terminal-body').forEach(terminal => {
          const lines = terminal.querySelectorAll('.line');
          let lineIndex = 0;
          const typeLine = () => {
            if (lineIndex >= lines.length) {
              const cursor = terminal.querySelector('.cursor');
              if (cursor) cursor.style.display = 'inline-block';
              return;
            }
            const line = lines[lineIndex];
            const valueEl = line.querySelector('.prompt-value');
            if (!valueEl) { lineIndex++; typeLine(); return; }
            const text = valueEl.getAttribute('data-value') || '';
            let charIndex = 0;
            valueEl.textContent = '';
            const typeChar = () => {
              if (charIndex < text.length) {
                valueEl.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 15);
              } else {
                lineIndex++;
                setTimeout(typeLine, 150);
              }
            };
            typeChar();
          };
          typeLine();
        });
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScripts);
      } else {
        initScripts(); // Exécution immédiate si l'iframe est déjà chargé
      }
    