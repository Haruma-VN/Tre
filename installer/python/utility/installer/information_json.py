from typing import Generic, TypeVar


# Generic type


T = TypeVar('T')

U = TypeVar('U')

P = TypeVar('P')


class InformationDict(Generic[T, U, P,]):

    def __init__(
            this,
            save_directory: T,
            version: U,
            language: P,
    ) -> None:
        this.save_directory = save_directory
        this.version = version
        this.language = language
