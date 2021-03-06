import {
  trigger,
  animate,
  style,
  group,
  animateChild,
  query,
  stagger,
  transition
} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }),
        { optional: true }),
    /* 3 */ group([ // block executes in parellel
        query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('1s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('1s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true })
    ])
  ])
]);
