declare const _exports: KeycloakSani;
export = _exports;
declare class KeycloakSani {
    config(params: any): KeycloakSani;
    sign(realm: any, params: any): Promise<any>;
    verify(token: any, publicKey: any): boolean;
    createUser(realm: any, token: any, payload: any): Promise<void>;
}