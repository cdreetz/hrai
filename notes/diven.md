1. Provide repo
2. Run `tree` to get repo structure
3. Given user prompt, and known structure, define plan
4. Use retrieval methods to determine files to consider
5. Perform completion on singular prompt that consists of prompt, files, plan, executables
6. UI is just these sections parsed and displayed separately

*? Use JSON mode for easy parsing?

1. "Using JSON mode, consider the prompt and file structure to write a plan."
{
  "prompt": "prompt",
  "file_struct": "files",
  "plan": "",
  "executables": ""
}

2. "Using JSON mode, consider the prompt, file struct, plan, then write the necessary executables."
{
  "prompt": "prompt",
  "file_struct": "files",
  "plan": [
    "read files 1-3",
    "determine changes to make",
    "make changes",
  ],
  "executables": ""
}

3.
{
  "prompt": "prompt",
  "file_struct": "files",
  "plan": [
    "read files 1-3",
    "determine changes to make",
    "make changes",
    ],
  "executables": [
    "cat file1.py file2.py file3.py",
    "sed -i '42s/oldtext/newtext/' file1.py",
    ]
}
