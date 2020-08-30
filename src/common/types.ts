export type Closure = () => void;
export type Consumer<T> = (value: T) => void;
export type Supplier<T> = () => T;
export type MapFunction<T, V> = (value: T) => V;
export type BiConsumer<T1, T2> = (x: T1, y: T2) => void;
export type BiFunction<T1, T2, V> = (x: T1, y: T2) => V;
