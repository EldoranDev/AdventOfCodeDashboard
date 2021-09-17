import {
    mdiGit,
    mdiGithub,
    mdiGitlab,
    mdiBitbucket,

    mdiCog,
    mdiLanguageTypescript,
    mdiLanguageJavascript,
    mdiLanguagePython,
    mdiLanguagePhp,
} from '@mdi/js';

export function getRepoIcon (link) {
    if (/.*github.*/.test(link)) {
        return mdiGithub;
    }

    if (/.*gitlab.*/.test(link)) {
        return mdiGitlab;
    }

    if (/.*bitbucket.*/.test(link)) {
        return mdiBitbucket;
    }

    return mdiGit;
}

const langMap = {
    'ts': mdiLanguageTypescript,
    'typescript': mdiLanguageTypescript,
    'js': mdiLanguageJavascript,
    'javascript': mdiLanguageJavascript,
    'python': mdiLanguagePython,
    'py': mdiLanguagePython,
    'php': mdiLanguagePhp,
}

export function getLanguageIcon(lang) {
    let icon = langMap[lang];

    if (icon === undefined) {
        icon = mdiCog;
    }

    return icon;
}

