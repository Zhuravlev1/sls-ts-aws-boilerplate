import groovy.json.JsonOutput

def sendToSlack(text) {
    def slackURL = 'https://hooks.slack.com/services/.../.../...'
    def payload = JsonOutput.toJson([
      text: text,
      channel: "#deployment",
      username: "Jenkins",
      icon_emoji: ":shufik:"
    ])

    sh "curl -X POST --data-urlencode \'payload=${payload}\' ${slackURL}"
}

def bash(String command) {
  result = sh(returnStdout: true, script: """#!/bin/bash -l
    $command
  """)
  println "$command -> $result"
  if (result) return result.trim()
}

def setState(String message, String state) {
   env.updateGitlabCommitStatus(name: message, state: state)
   currentBuild.result = state
}

def jobDecorator(List<String> credentials, List<String> vars, Closure<Void> onError, Closure<Void> job) {
  try {
    withEnv(vars) {
      withCredentials(credentials) {
        job()
      }
    }

  } catch (error) {
    onError(error)
    throw error
  }
}

return this
