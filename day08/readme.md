Setting up git on the cloud shell  
1. Fork the cssi repo (github.com/google/cssi-labs)[https://github.com/google/cssi-labs]

2. Use `git remote set-url origin <url>` where <url> is the link that you can get from the your fork's github page download code button (fork page --> green code button --> https --> copy link) Note: If you are an experienced git user and only want to change the upstream URL simply add the `--push` flag after `set-url`

3. Use the `git remote -vv` command to verify the changes. The output should be:  
    `origin  https://github.com/<your-github-username>/cssi-labs.git (fetch)`  
`origin  https://github.com/<your-github-username>/cssi-labs.git (push)`  
  
4. To prevent future hassle we need to configure git with our email and name (if you have done this already it's not a problem but keep in mind you are on a fresh machine). To do this we will use git's config tool.
* For the email we will run: `git config --global user.email "you@example.com"` and `git config --global user.name "Your Name"`. This sets your email and name globally for all future git endeavors.

## Pushing changes to the github repo  
5. Use the `git status` command, this should print out the files you modified.  
Look for this text in the output:  
```
        modified:   public/index.html
        modified:   public/js/viewMessages.js
        modified:   public/viewMessages.html
```  
If there are more that are listed as modified (not in the untracked files section) that you added code too that's fine.  

6. It's now time to add these files to be committed.  
Note: if you are not familiar with git this step essentially tells git that the files are ready to be included in the commit version. If this language is very new I very much recommend searching google/youtube for good tutorials. Another great resource is the git documentation [git-scm.com/doc](https://www.git-scm.com/doc) where you can search for docs on any of the commands used in this "guide".  
Alright, to add the files use the `git add public/.` command. The period denotes that anything inside the public directory that has been modified should be added. We will verify this in the next step.  

7. It's now time to make sure we added the correct files. Think back to step #1 and what files where modified, if we re-run `git status` those files should now be highlighted in green.  

8. Now it's time to commit (aka: telling git that the code's difference from the last version at this point in time should be saved).  
**Note: If you want to see the changes to be committed run the `git diff` command.**  
To do this we run the `git commit -m "<message>"` command. In this example <message> should be replaced with a description of what you've changed. Also in case it was not clear the `-m` flag tells git that we'd like to include a message with our commit (which is very much good practice). 


9. Now it's time for the fun part, ***Pushing to GitHub!!***  
To push the changes we will use `git push`. However before we get started it's important to clear some things up. Firstly, in this example we will be using https and passwords to login to GitHub, however this is being deprecated soon and you should research how to set up SSH key login with github in order to stay secure and up to date with the latest standards. It's not very hard and can make life so much simpler.  
Alright, to push we will use the command syntax `git push <remote-name> main` where <remote-name> is the remote name set up in step 2 (hint: if you entered everything verbatim it is origin). You should be prompted to enter your GitHub username and password, then the changes will be pushed up to GitHub and should be visible on your fork's GitHub page.
