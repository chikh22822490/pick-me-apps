import keycloak from 'keycloak-js'

type KeyCloakUserInfoPresentation = {
  sub: string
  preferred_username: string
  given_name: string
  family_name: string
  name: string
  email: string
}
export type UserInfo = {
  id: string
  username: string
  firstName: string
  lastName: string
  fullname: string
  email: string
}
export class AuthInstance {
  _keycloakInstance: keycloak

  constructor(keycloakConfig: { realm: string; url: string; clientId: string }) {
    this._keycloakInstance = new keycloak(keycloakConfig)
  }

  CallLogin(onAuthenticatedCallback: () => Promise<void>) {
    const keycloakInstance = this._keycloakInstance
    keycloakInstance.init({ onLoad: 'login-required' }).then(async function (authenticated: boolean) {
      await keycloakInstance.loadUserInfo()
      authenticated ? await onAuthenticatedCallback() : alert('non authenticated')
    })
  }

  async GetUserName(): Promise<string> {
    const username = await this._keycloakInstance.tokenParsed?.['preferred_username']
    return username
  }

  async GetUserInfo(): Promise<UserInfo> {
    await this._keycloakInstance.loadUserInfo()
    const userInfo: KeyCloakUserInfoPresentation = this._keycloakInstance
      .userInfo as KeyCloakUserInfoPresentation
    return {
      id: userInfo.sub,
      username: userInfo.preferred_username,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      fullname: userInfo.name,
      email: userInfo.email
    }
  }

  async GetUserRoles() {
    const roles = await this._keycloakInstance.realmAccess?.roles
    return roles
  }

  async GetAccesToken(): Promise<string | undefined> {
    if (this._keycloakInstance.isTokenExpired()) await this._keycloakInstance.updateToken(600)
    return this._keycloakInstance?.token
  }

  isActiveUserAdmin() {
    return this._keycloakInstance.hasRealmRole('ADMIN')
  }

  isActiveUserInvestorUser() {
    return this._keycloakInstance.hasRealmRole('INVESTOR_USER')
  }

  CallLogOut() {
    return this._keycloakInstance.logout()
  }
}
