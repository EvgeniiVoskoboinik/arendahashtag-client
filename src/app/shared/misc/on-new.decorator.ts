export function OnNew<TClass, T>(handlerGetter: (x: TClass) => (
    newVal?: T,
    oldVal?: T,
    firstValue?: boolean,
) => void): Function {
    return (target: Function, property: string) => {
        let innerProperty: string = `_${property}`;
        let isNotFirstValueProperty = `_${property}_is_FirstValue`;

        Object.defineProperty(target, innerProperty, <PropertyDescriptor>{
            enumerable: false,
            configurable: false,
            writable: true,
        });
        Object.defineProperty(target, isNotFirstValueProperty, <PropertyDescriptor>{
            enumerable: false,
            configurable: false,
            writable: true,
        });

        Object.defineProperty(target, property, <PropertyDescriptor>{
            enumerable: true,
            configurable: false,
            get(): T {
                return this[innerProperty];
            },
            set(val: T): void {
                if (this[innerProperty] === val) {
                    return;
                }

                let oldVal = this[innerProperty];
                this[innerProperty] = val;

                let firstValue = this[isNotFirstValueProperty] !== true;
                handlerGetter(this).call(this, val, oldVal, firstValue);
                this[isNotFirstValueProperty] = true;
            },
        });
    };
}