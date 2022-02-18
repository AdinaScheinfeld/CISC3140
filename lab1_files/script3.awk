BEGIN {
FS = ","
OFS = ","
}

NR>1 {
if(x != $5) {i++}{x=$5};
print $0 FS i
}
