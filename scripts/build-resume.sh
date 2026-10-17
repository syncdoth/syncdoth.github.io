#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd -- "${script_dir}/.." && pwd)"
source_file="${repo_root}/public/assets/pdf/resume.tex"
output_file="${repo_root}/public/assets/pdf/resume.pdf"
build_dir="${repo_root}/tmp/resume-build"

if ! command -v pdflatex >/dev/null 2>&1; then
  printf 'pdflatex is required to build the résumé PDF.\n' >&2
  exit 1
fi

mkdir -p "${build_dir}"
pdflatex -interaction=nonstopmode -halt-on-error -output-directory="${build_dir}" "${source_file}"
pdflatex -interaction=nonstopmode -halt-on-error -output-directory="${build_dir}" "${source_file}"
cp "${build_dir}/resume.pdf" "${output_file}"
printf 'Built résumé PDF: %s\n' "${output_file}"
