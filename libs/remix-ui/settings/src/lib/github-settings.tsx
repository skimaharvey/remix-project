import { CopyToClipboard } from '@remix-ui/clipboard'
import React, { useEffect, useState } from 'react'
import { GithubSettingsProps } from '../types'
import { gitAccessTokenTitle, gitAccessTokenText, gitAccessTokenText2, gitAccessTokenLink } from './constants'


export function GithubSettings (props: GithubSettingsProps) {
  const [githubToken, setGithubToken] = useState<string>("")
  const [githubUserName, setGithubUsername] = useState<string>("")
  const [githubEmail, setGithubEmail] = useState<string>("")

  useEffect(() => {
    if (props.config) {
      const githubToken = props.config.get('settings/gist-access-token') || ''
      const githubUserName = props.config.get('settings/github-user-name') || ''
      const githubEmail = props.config.get('settings/github-email') || ''
  
      setGithubToken(githubToken)
      setGithubUsername(githubUserName)
      setGithubEmail(githubEmail)
    }
  }, [props.config])

  const handleChangeTokenState = (event) => {
    setGithubToken(event.target.value)
  }

  const handleChangeUserNameState = (event) => {
    setGithubUsername(event.target.value)
  }

  const handleChangeEmailState = (event) => {
    setGithubEmail(event.target.value)
  }

  // api key settings
  const saveGithubToken = () => {
    props.saveTokenToast(githubToken, githubUserName, githubEmail)
  }

  const removeToken = () => {
    setGithubToken('')
    setGithubUsername('')
    setGithubEmail('')
    props.removeTokenToast()
  }
  
  return (
    <div className="border-top">
      <div className="card-body pt-3 pb-2">
        <h6 className="card-title">{gitAccessTokenTitle}</h6>
        <p className="mb-1">{gitAccessTokenText}</p>
        <p className="">{gitAccessTokenText2}</p>
        <p className="mb-1"><a className="text-primary" target="_blank" href={gitAccessTokenLink}>{gitAccessTokenLink}</a></p>
        <div>
          <label className="mb-0 pb-0">TOKEN:</label>
          <div className="input-group text-secondary mb-0 h6">
            <input id="gistaccesstoken" data-id="settingsTabGistAccessToken" type="password" className="form-control" onChange={(e) => handleChangeTokenState(e)} value={ githubToken } />
            <div className="input-group-append">
              <CopyToClipboard content={githubToken} data-id='copyToClipboardCopyIcon' className='far fa-copy ml-1 p-2 mt-1' direction={"top"} />
            </div>
          </div>
        </div>
        <div>
          <label className="pt-2 mb-0 pb-0">USERNAME:</label>
          <div className="text-secondary mb-0 h6">
            <input id="githubusername" data-id="settingsTabGithubUsername" type="text" className="form-control" onChange={(e) => handleChangeUserNameState(e)} value={ githubUserName } />
          </div>
        </div>
        <div>
          <label className="pt-2 mb-0 pb-0">EMAIL:</label>
          <div className="text-secondary mb-0 h6">
            <input id="githubemail" data-id="settingsTabGithubEmail" type="text" className="form-control" onChange={(e) => handleChangeEmailState(e)} value={ githubEmail } />
            <div className="d-flex justify-content-end pt-2">
              <input className="btn btn-sm btn-primary ml-2" id="savegisttoken" data-id="settingsTabSaveGistToken" onClick={saveGithubToken} value="Save" type="button" disabled={githubToken === ''}></input>
              <button className="btn btn-sm btn-secondary ml-2" id="removegisttoken" data-id="settingsTabRemoveGistToken" title="Delete GitHub Credentials" onClick={removeToken}>Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}