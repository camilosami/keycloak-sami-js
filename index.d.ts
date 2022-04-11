declare const _exports: KeycloakSani;
export = _exports;
declare class KeycloakSami {
    constructor(params: any);
    sign(username: any, password: any): Promise<any>;
    verify(token: any): boolean;
    createUser(token: any, realm: any, payload: any): Promise<void>;
}