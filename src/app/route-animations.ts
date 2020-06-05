import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    animateChild
 } from '@angular/animations';

 export const slideUpDownAnimation =

    trigger('routeAnimations', [
        transition('Fourth => *', [
              query(':enter, :leave', 
                   style({ position: 'fixed', width: '100%' }), 
                   { optional: true }),        
              group([
                    query(':enter',[
                       style({ transform: 'translateY(-100%)' }),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateY(0%)' }))
                    ], { optional: true }),
                    query(':leave', [
                       style({ transform:   'translateY(0%)'}),
                       animate('0.5s ease-in-out', 
                       style({ transform: 'translateY(100%)' }))
                    ], { optional: true }),
                ])
        ]),
        transition('Second => First', [
            query(':enter, :leave',
                style({ position: 'fixed', width: '100%' }),
                { optional: true }),
            group([
                query(':enter', [
                  style({ transform: 'translateY(-100%)' }),
                  animate('0.5s ease-in-out',
                    style({ transform: 'translateY(0%)' }))
                ], { optional: true }),
                query(':leave', [
                  style({ transform: 'translateY(0%)' }),
                  animate('0.5s ease-in-out',
                    style({ transform: 'translateY(100%)' }))
                ], { optional: true }),
            ])
        ]),
        transition('Second => *', [
            query(':enter, :leave', 
                 style({ position: 'fixed', width: '100%' }), 
                 { optional: true }),        
            group([
                 query(':enter',[
                     style({ transform: 'translateY(100%)' }),
                     animate('0.5s ease-in-out', 
                     style({ transform: 'translateY(0%)' }))
                 ], { optional: true }),
                 query(':leave', [
                     style({ transform:   'translateY(0%)'}),
                     animate('0.5s ease-in-out', 
                     style({ transform: 'translateY(-100%)' }))
                 ], { optional: true }),
            ])
        ]),
        transition('First => *', [
          query(':enter, :leave',
            style({ position: 'fixed', width: '100%' }),
            { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateY(100%)' }),
                    animate('0.5s ease-in-out',
                    style({ transform: 'translateY(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateY(0%)' }),
                    animate('0.5s ease-in-out',
                    style({ transform: 'translateY(-100%)' }))
              ], { optional: true }),
          ])
        ]),
        transition('Third => Fourth', [
            query(':enter, :leave',
                style({ position: 'fixed', width: '100%' }),
                { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateY(100%)' }),
                    animate('0.5s ease-in-out',
                    style({ transform: 'translateY(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateY(0%)' }),
                    animate('0.5s ease-in-out',
                    style({ transform: 'translateY(-100%)' }))
                ], { optional: true }),
            ])
        ]),
        transition('Third => *', [
            query(':enter, :leave',
                style({ position: 'fixed', width: '100%' }),
                { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateY(-100%)' }),
                    animate('0.5s ease-in-out',
                    style({ transform: 'translateY(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateY(0%)' }),
                    animate('0.5s ease-in-out',
                    style({ transform: 'translateY(100%)' }))
                ], { optional: true }),
            ])
        ])
 ]);
