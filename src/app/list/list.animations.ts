import {
    trigger,
    transition,
    query,
    style,
    stagger,
    animate,
    keyframes
} from '@angular/animations';

export const listAnimations = trigger('listAnimations', [
           transition('* => *', [
               query(':enter', style({ opacity: 0 }), {
                   optional: true
               }),
               query(
                   ':enter',
                   stagger('0s', [
                       animate(
                           '.3s ease-out',
                           keyframes([
                               style({
                                   opacity: 0,
                                   transform: 'scale(0.2)',
                                   offset: 0
                               }),
                               style({
                                   opacity: 1,
                                   offset: 0.2
                               }),
                               style({
                                   transform: 'scale(1.1)',
                                   offset: 0.6
                               }),
                               style({
                                   transform: 'scale(0.8)',
                                   offset: 0.8
                               }),
                               style({
                                   opacity: 1,
                                   transform: 'scale(1)',
                                   offset: 1
                               })
                           ])
                       )
                   ]),
                   { optional: true }
               ),
               query(
                   ':leave',
                   stagger('0s', [
                       animate(
                           '.3s ease-in',
                           keyframes([
                               style({
                                   opacity: 1,
                                   transform: 'scale(1)',
                                   offset: 0
                               }),
                               style({
                                   opacity: 1,
                                   transform: 'scale(1.1)',
                                   offset: 0.4
                               }),
                               style({
                                   opacity: 1,
                                   transform: 'scale(0.8)',
                                   offset: 0.6
                               }),
                               style({
                                   opacity: 0,
                                   transform: 'scale(0)',
                                   offset: 1.0
                               })
                           ])
                       )
                   ]),
                   { optional: true }
               )
           ])
       ]);
