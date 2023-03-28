import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useNavPath({ ref, segmentIndex = 0 }: any = {}) {
  const nav = useNavigate();

  useEffect(() => {
    if (!ref) return;

    const elements = ref.current?.querySelectorAll?.('[nav-path]') || [];

    for (const el of elements) {
      const path = el.getAttribute('nav-path');

      el.addEventListener('click', (e: any) => {
        const currentPath = location.pathname.split('/').filter((x) => x.length > 0)[segmentIndex];

        if (currentPath != path) {
          const element = ref.current.querySelector(':scope > .active');

          element?.classList.remove('active');

          e.target.classList.add('active');

          nav(path);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!ref) return;

    const path = location.pathname.split('/').filter((x) => x.length > 0)[segmentIndex];

    if (path) {
      const element = ref.current?.querySelector?.(':scope > .active');

      element?.classList.remove('active');

      const nextItem = ref.current?.querySelector?.(`[nav-path='${path.toString()}']`);

      nextItem?.classList.add('active');
    }
  });
}
