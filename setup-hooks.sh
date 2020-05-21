#!/bin/sh

pre_commit() {
echo '#!/bin/sh

STAGED_FILES=$(git diff --name-only --staged  | grep "\.js$")
VALID=true

if [ -z "$STAGED_FILES" ]; then
    exit 0
fi

# Test for eslint
which eslint &> /dev/null
if [[ $? == 1 ]]; then
    echo -e "\033[31m\033[1mESlint is required. Please install ESlint.\033[0m"
fi

# Try to fix files
for file in $STAGED_FILES; do
    eslint --config=./.eslintrc.json --fix $file &> /dev/null
done
git add $STAGED_FILES


# Run eslint
for file in $STAGED_FILES; do
    output=$(eslint --config=./.eslintrc.json $file | head -n -4 | sed 1,2d | sed "s/^..//")
    if [[ $output != "" ]]; then
        echo -e "[ \033[31m\033[1mKO\033[0m ] $file"
        echo "$output" | sed "s/^/  /"
        VALID=false
    else
        echo -e "[ \033[32m\033[1mOK\033[0m ] $file"
    fi
done

# Final output
if ! $VALID; then
    echo -e "\033[31m\033[1mCommit failed, your code contains some errors, try --fix.\033[0m"
    exit 1
fi

echo -e "\033[32m\033[1mCommit succeed.\033[0m"' > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
}

pre_push()
{
echo '#!/bin/sh

current_branch=$(git branch | grep "^\*." | sed "s/^\* //g")

if [ "$current_branch" = "master" ]; then
    exit 0
fi
echo $current_branch | grep -qP "^(feature|improvement|fix)\/[a-zA-Z0-9-_]+" > /dev/null
if [[ $? == 1 ]]; then
    echo -e "\033[31m\033[1mYour branch name is valid.\nPatern : (feature|improvement|fix)/branchName\033[0m"
    exit 1
fi' > .git/hooks/pre-push
chmod +x .git/hooks/pre-push
}

pre_commit
pre_push
