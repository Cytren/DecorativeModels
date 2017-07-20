
export default function (min: number, max: number): PropertyDecorator {
    return (target: Object, name: string) => {
        console.log(`${name} - ${min} <-> ${max}`);
    };
}